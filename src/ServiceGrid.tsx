import React from 'react';
import { BookOpen, Newspaper, Calendar } from 'lucide-react';
import ServiceCard from './ServiceCard';

interface ServiceGridProps {
  onNavigate: (path: string) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ onNavigate }) => {
  const services = [
    {
      title: 'Guide',
      description: 'Raccolta di guide pratiche e risorse utili per vivere e integrarsi meglio',
      icon: BookOpen,
      path: '/guide'
    },
    {
      title: 'Notizie',
      description: 'Resta aggiornato con le ultime notizie ed eventi dal mondo MaghrebItalia',
      icon: Newspaper,
      path: '/notizie'
    },
    {
      title: 'Eventi',
      description: 'Scopri gli eventi della comunità MaghrebItalia: incontri, workshop e celebrazioni',
      icon: Calendar,
      path: '/eventi'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.path}
          {...service}
          onClick={() => onNavigate(service.path)}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;