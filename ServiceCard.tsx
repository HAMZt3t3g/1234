import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, path, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-[#006D5B] focus-within:ring-offset-2"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Vai alla sezione ${title}`}
      data-url={path}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-[#006D5B] mb-4">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;