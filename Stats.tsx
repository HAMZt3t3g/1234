import React from 'react';
import { Users, BookOpen, Calendar } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      number: '5.000+',
      label: 'membri della comunità',
      icon: Users,
    },
    {
      number: '120+',
      label: 'guide pubblicate',
      icon: BookOpen,
    },
    {
      number: '45',
      label: 'eventi organizzati',
      icon: Calendar,
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="mb-4 p-3 rounded-full bg-[#006D5B]/10">
                <stat.icon className="h-8 w-8 text-[#006D5B]" />
              </div>
              <div className="text-4xl font-bold text-[#006D5B] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;