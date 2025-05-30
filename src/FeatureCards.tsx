import React from 'react';
import { BookOpen, Newspaper, Calendar } from 'lucide-react';
import NavigationButton from './NavigationButtons';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  linkText: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, color, linkText, onClick }) => (
  <div 
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }}
    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer group hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D5B] focus-visible:ring-offset-2"
    tabIndex={0}
    role="button"
    aria-label={`Vai alla sezione ${title}`}
  >
    <div className={`p-4 rounded-full ${color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#006D5B] transition-colors">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <span className="mt-auto text-[#006D5B] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 font-medium">
      {linkText} →
    </span>
  </div>
);

interface FeatureCardsProps {
  setCurrentPage: (page: 'home' | 'guides' | 'news' | 'events') => void;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ setCurrentPage }) => {
  const features = [
    {
      title: 'Guide',
      description: 'Raccolta di guide pratiche e risorse utili per vivere e integrarsi meglio',
      icon: BookOpen,
      color: 'bg-[#006D5B]',
      linkText: 'Vai alle guide',
      onClick: () => setCurrentPage('guides'),
    },
    {
      title: 'Notizie',
      description: 'Resta aggiornato con le ultime notizie ed eventi dal mondo MaghrebItalia',
      icon: Newspaper,
      color: 'bg-[#E74C3C]',
      linkText: 'Leggi le notizie',
      onClick: () => setCurrentPage('news'),
    },
    {
      title: 'Eventi',
      description: 'Scopri gli eventi della comunità MaghrebItalia: incontri, workshop e celebrazioni',
      icon: Calendar,
      color: 'bg-[#4834D4]',
      linkText: 'Vedi gli eventi',
      onClick: () => setCurrentPage('events'),
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;