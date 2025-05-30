import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[600px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/Progetto senza titolo (3).png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('welcome_msg')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-lato text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero_subtitle')}
          </motion.p>
          <motion.button
            onClick={onExploreClick}
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Vai alle notizie"
          >
            {t('discover_more')}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;