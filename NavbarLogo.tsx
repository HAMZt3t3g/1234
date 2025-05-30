import React from 'react';
import { Compass, Globe2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarLogoProps {
  onHomeClick: () => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ onHomeClick }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onHomeClick}
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Compass className="h-6 w-6 text-white" />
        <span className="text-xl font-bold text-white">MaghrebItalia</span>
      </button>
      
      <div className="hidden sm:flex items-center gap-2 text-white/90">
        <Globe2 className="h-4 w-4" />
        <select 
          className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer hover:text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'it' | 'ar' | 'fr')}
        >
          <option value="it" className="text-gray-900">Italiano</option>
          <option value="ar" className="text-gray-900">العربية</option>
          <option value="fr" className="text-gray-900">Français</option>
        </select>
      </div>
    </div>
  );
};

export default NavbarLogo;