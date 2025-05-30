import React, { useState } from 'react';
import { Clock, Search, Loader2, Plus } from 'lucide-react';
import { useEvents, EventItem as EventItemType } from '../hooks/useEvents';
import EventItem from '../components/EventItem';
import AdminEventForm from '../components/AdminEventForm';
import { useLanguage } from '../contexts/LanguageContext';
import BackNavigation from '../components/BackNavigation';

interface EventsPageProps {
  setCurrentPage: (page: 'home' | 'guides' | 'news' | 'events') => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const { events, loading, error } = useEvents();
  const { t } = useLanguage();

  const eventCategories = {
    Cultura: "bg-purple-600",
    Gastronomia: "bg-[#FFA500]",
    Arte: "bg-[#006D5B]",
    Musica: "bg-blue-600",
    Sport: "bg-red-600",
    Sociale: "bg-teal-600",
    Business: "bg-emerald-600",
    Educazione: "bg-indigo-600"
  };

  const filteredEvents = events.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackNavigation 
          onClick={() => setCurrentPage('home')} 
          label="Torna alla homepage"
        />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-montserrat">{t('event_title')}</h1>
          <p className="text-gray-600 max-w-2xl font-lato">{t('event_description')}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-96">
              <input
                type="text"
                placeholder={t('search_events')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#006D5B] shadow-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowAdminForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005A4B] transition-colors whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">{t('add_event')}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(eventCategories).map(([category, color]) => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className={`${color} text-white text-sm px-3 py-1 rounded-full hover:opacity-90 transition-opacity capitalize`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-[#006D5B] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventItem
                key={event.id}
                {...event}
                categoryColor={eventCategories[event.category as keyof typeof eventCategories]}
              />
            ))}
          </div>
        )}
      </div>

      {showAdminForm && (
        <AdminEventForm onClose={() => setShowAdminForm(false)} />
      )}
    </div>
  );
};

export default EventsPage;