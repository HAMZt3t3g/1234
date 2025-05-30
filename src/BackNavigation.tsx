import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackNavigationProps {
  onClick?: () => void;
  label?: string;
  fallbackPath?: string;
}

const BackNavigation: React.FC<BackNavigationProps> = ({ 
  onClick, 
  label = 'Torna alle notizie',
  fallbackPath = '/notizie'
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = fallbackPath;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group inline-flex items-center text-[#006D5B] hover:text-[#005A4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006D5B] focus:ring-offset-2 rounded-lg px-3 py-2"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      <span>{label}</span>
    </motion.button>
  );
};

export default BackNavigation;