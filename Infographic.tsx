import React from 'react';
import { TrendingUp, Users, Globe2, BookOpen } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-soft transition-transform hover:scale-105">
    <div className={`${color} p-4 rounded-full mb-4`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <span className="text-3xl font-montserrat font-bold mb-2 text-gradient">{value}</span>
    <span className="text-neutral-600 font-lato text-sm text-center">{label}</span>
  </div>
);

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
  <div className="relative flex items-start gap-4 p-6 bg-white rounded-xl shadow-soft">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#006D5B] to-[#00A388] rounded-full text-white font-montserrat font-bold">
      {number}
    </div>
    <div>
      <h3 className="font-montserrat font-semibold text-lg mb-2">{title}</h3>
      <p className="font-lato text-neutral-600">{description}</p>
    </div>
  </div>
);

export const StatisticGrid: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "15K+",
      label: "Membri attivi nella comunità",
      color: "bg-[#006D5B]"
    },
    {
      icon: Globe2,
      value: "25+",
      label: "Città con eventi regolari",
      color: "bg-[#1B4B82]"
    },
    {
      icon: BookOpen,
      value: "200+",
      label: "Guide e risorse disponibili",
      color: "bg-[#E67E22]"
    },
    {
      icon: TrendingUp,
      value: "45%",
      label: "Crescita annuale della community",
      color: "bg-[#4834D4]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export const ProcessFlow: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Registrazione",
      description: "Crea il tuo profilo personale nella community MaghrebItalia"
    },
    {
      number: 2,
      title: "Esplorazione",
      description: "Scopri guide, eventi e connettiti con altri membri della comunità"
    },
    {
      number: 3,
      title: "Partecipazione",
      description: "Prendi parte agli eventi e contribuisci alla crescita della community"
    }
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <ProcessStep key={index} {...step} />
      ))}
    </div>
  );
};

export default { StatisticGrid, ProcessFlow };