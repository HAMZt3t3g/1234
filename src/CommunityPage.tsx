import React from 'react';
import { MessageCircle, Users, Calendar, HandHelping, Newspaper, Share2, ArrowLeft } from 'lucide-react';

interface CommunityCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center cursor-pointer group">
    <div className={`${color} p-4 rounded-full mb-4 transform group-hover:scale-105 transition-transform duration-300`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <span className="mt-auto text-[#006D5B] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center text-sm font-medium">
      Partecipa →
    </span>
  </div>
);

interface CommunityPageProps {
  setCurrentPage: (page: 'home' | 'guides' | 'community') => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ setCurrentPage }) => {
  const categories = [
    {
      title: 'Forum di Discussione',
      description: 'Spazio di dialogo per condividere esperienze, fare domande e ricevere consigli',
      icon: MessageCircle,
      color: 'bg-[#FFA500]',
    },
    {
      title: 'Gruppi Locali',
      description: 'Trova e unisciti a gruppi della comunità nella tua città o regione',
      icon: Users,
      color: 'bg-[#006D5B]',
    },
    {
      title: 'Eventi',
      description: 'Calendario degli incontri, workshop e attività culturali della comunità',
      icon: Calendar,
      color: 'bg-purple-600',
    },
    {
      title: 'Mutuo Aiuto',
      description: 'Rete di supporto reciproco per necessità pratiche e consigli',
      icon: HandHelping,
      color: 'bg-red-600',
    },
    {
      title: 'Blog della Comunità',
      description: 'Storie, testimonianze e articoli scritti dai membri della comunità',
      icon: Newspaper,
      color: 'bg-blue-600',
    },
    {
      title: 'Progetti Collaborativi',
      description: 'Iniziative e progetti creati e gestiti dai membri della comunità',
      icon: Share2,
      color: 'bg-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-8 inline-flex items-center text-[#006D5B] hover:text-[#005A4B] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Torna alla homepage</span>
        </button>

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Comunità MaghrebItalia
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Unisciti alla nostra comunità attiva e partecipa alle diverse iniziative. Insieme possiamo creare connessioni significative e supportarci a vicenda.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CommunityCard key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;