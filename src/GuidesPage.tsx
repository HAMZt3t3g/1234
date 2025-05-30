import React from 'react';
import { Briefcase, BookOpen, Heart, Languages, Globe2, Building2 } from 'lucide-react';
import BackNavigation from '../components/BackNavigation';

interface GuideCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, description, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center cursor-pointer group">
    <div className={`${color} p-4 rounded-full mb-4 transform group-hover:scale-105 transition-transform duration-300`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <span className="mt-auto text-[#006D5B] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center text-sm font-medium">
      Scopri di più →
    </span>
  </div>
);

interface GuidesPageProps {
  setCurrentPage: (page: 'home' | 'guides') => void;
}

const GuidesPage: React.FC<GuidesPageProps> = ({ setCurrentPage }) => {
  const categories = [
    {
      title: 'Lavoro',
      description: 'Guide su opportunità di impiego, ricerca lavoro e ambiente professionale',
      icon: Briefcase,
      color: 'bg-blue-600',
    },
    {
      title: 'Istruzione',
      description: 'Risorse per studio, scuola e formazione professionale',
      icon: BookOpen,
      color: 'bg-[#006D5B]',
    },
    {
      title: 'Salute',
      description: 'Informazioni su assistenza sanitaria e benessere',
      icon: Heart,
      color: 'bg-red-600',
    },
    {
      title: 'Lingua',
      description: 'Materiali per imparare l\'italiano e servizi di traduzione',
      icon: Languages,
      color: 'bg-[#FFA500]',
    },
    {
      title: 'Cultura',
      description: 'Iniziative culturali, vita sociale e integrazione',
      icon: Globe2,
      color: 'bg-purple-600',
    },
    {
      title: 'Servizi',
      description: 'Orientamento a servizi pubblici, documenti e burocrazia',
      icon: Building2,
      color: 'bg-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackNavigation 
          onClick={() => setCurrentPage('home')} 
          label="Torna alla homepage"
        />

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Guide e Risorse
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Esplora le nostre guide suddivise per area tematica. Seleziona una categoria per trovare risorse utili e consigli pratici.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <GuideCard key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;