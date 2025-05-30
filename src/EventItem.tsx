import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { EventItem as EventItemType } from '../hooks/useEvents';
import { useLanguage } from '../contexts/LanguageContext';

interface EventItemProps extends EventItemType {
  categoryColor: string;
  onReadMore: () => void;
}

const EventItem: React.FC<EventItemProps> = ({
  title,
  excerpt,
  date,
  time,
  location,
  imageUrl,
  category,
  categoryColor,
  organizer,
  onReadMore
}) => {
  const { t } = useLanguage();
  const eventDate = new Date(date);
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <span 
          className={`absolute top-4 left-4 ${categoryColor} text-white text-sm px-3 py-1 rounded-full`}
        >
          {category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 font-montserrat">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 font-lato">{excerpt}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{eventDate.toLocaleDateString()} - {time}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#006D5B] text-sm font-medium">{organizer}</span>
          <button 
            onClick={onReadMore}
            className="text-[#006D5B] hover:text-[#005A4B] transition-colors inline-flex items-center text-sm font-medium"
          >
            {t('read_more')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;