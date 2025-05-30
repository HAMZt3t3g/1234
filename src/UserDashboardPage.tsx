import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents, EventItem } from '../hooks/useEvents';
import { useLanguage } from '../contexts/LanguageContext';
import BackNavigation from '../components/BackNavigation';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}

interface RegisteredEvent extends EventItem {
  registrationDate: number;
}

interface UserDashboardPageProps {
  setCurrentPage: (page: 'home' | 'dashboard') => void;
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const { events } = useEvents();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'events' | 'comments' | 'settings'>('events');
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (user) {
      // Load registered events
      const savedRegistrations = localStorage.getItem(`userEvents_${user.id}`);
      if (savedRegistrations) {
        const registrationData = JSON.parse(savedRegistrations);
        const userEvents = events.filter(event => 
          registrationData.some((reg: { eventId: string }) => reg.eventId === event.id)
        ).map(event => ({
          ...event,
          registrationDate: registrationData.find((reg: { eventId: string }) => reg.eventId === event.id).timestamp
        }));
        setRegisteredEvents(userEvents);
      }

      // Load user comments
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        const allComments = JSON.parse(savedComments);
        setUserComments(allComments.filter((comment: Comment) => comment.userId === user.id));
      }
    }
  }, [user, events]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-gray-600">Effettua l'accesso per visualizzare il dashboard.</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackNavigation 
          onClick={() => setCurrentPage('home')} 
          label="Torna alla homepage"
        />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* User Header */}
          <div className="bg-[#006D5B] text-white p-8">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar || "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-white/80">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'events'
                    ? 'border-[#006D5B] text-[#006D5B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar className="h-5 w-5" />
                Eventi Registrati
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'comments'
                    ? 'border-[#006D5B] text-[#006D5B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                I Miei Commenti
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'border-[#006D5B] text-[#006D5B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="h-5 w-5" />
                Impostazioni
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'events' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Eventi Registrati</h2>
                {registeredEvents.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Non ti sei ancora registrato a nessun evento.
                  </p>
                ) : (
                  registeredEvents.map(event => (
                    <div key={event.id} className="bg-gray-50 rounded-lg p-4 flex items-start gap-4">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-2">{event.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Data: {new Date(event.date).toLocaleDateString()}</span>
                          <span>Ora: {event.time}</span>
                          <span>Luogo: {event.location}</span>
                        </div>
                        <p className="text-sm text-[#006D5B] mt-2">
                          Registrato il {formatDate(event.registrationDate)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">I Miei Commenti</h2>
                {userComments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Non hai ancora pubblicato commenti.
                  </p>
                ) : (
                  userComments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <p className="text-sm text-gray-500">
                        Pubblicato il {formatDate(comment.timestamp)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Impostazioni Account</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notifiche Email
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-[#006D5B]"
                          defaultChecked
                        />
                        <span className="ml-2">Ricevi notifiche per nuovi eventi</span>
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-[#006D5B]"
                          defaultChecked
                        />
                        <span className="ml-2">Ricevi notifiche per risposte ai commenti</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Privacy
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-[#006D5B]"
                          defaultChecked
                        />
                        <span className="ml-2">Mostra il mio profilo pubblicamente</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;