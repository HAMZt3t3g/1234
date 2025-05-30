import React, { useState } from 'react';
import { Clock, MapPin, X, Calendar, Check } from 'lucide-react';
import { EventItem } from '../hooks/useEvents';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface DetailedEventViewProps {
  event: EventItem & { categoryColor: string };
  onClose: () => void;
}

const DetailedEventView: React.FC<DetailedEventViewProps> = ({ event, onClose }) => {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const eventDate = new Date(event.date);
  
  const handleRegistration = async () => {
    if (!user) {
      toast.error('Devi effettuare l\'accesso per registrarti all\'evento');
      return;
    }

    setIsRegistering(true);
    try {
      // Save registration to localStorage
      const registrations = JSON.parse(localStorage.getItem(`userEvents_${user.id}`) || '[]');
      registrations.push({
        eventId: event.id,
        timestamp: Date.now()
      });
      localStorage.setItem(`userEvents_${user.id}`, JSON.stringify(registrations));
      
      setIsRegistered(true);
      toast.success('Registrazione all\'evento completata!');
    } catch (error) {
      toast.error('Errore durante la registrazione. Riprova più tardi.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-72 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <span className={`absolute top-4 left-4 ${event.categoryColor} text-white text-sm px-3 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>
        
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold font-montserrat text-gray-900">{event.title}</h2>
            {user && (
              <button
                onClick={handleRegistration}
                disabled={isRegistered || isRegistering}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  isRegistered
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-[#006D5B] text-white hover:bg-[#005A4B]'
                }`}
              >
                {isRegistered ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Registrato</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    <span>Registrati</span>
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Data e Ora</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{eventDate.toLocaleDateString()} - {event.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Luogo</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{event.location}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizzatore</p>
                <p className="text-gray-900 mt-1">{event.organizer}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 font-lato leading-relaxed whitespace-pre-line">
              {event.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedEventView;