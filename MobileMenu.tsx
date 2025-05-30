import React from 'react';
import { X, Globe2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: 'home' | 'guides' | 'news' | 'events' | 'profile') => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentPage, onPageChange }) => {
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { label: t('nav_home'), page: 'home' as const },
    { label: t('nav_news'), page: 'news' as const },
    { label: t('nav_events'), page: 'events' as const },
    { label: 'Guide', page: 'guides' as const },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute right-0 h-full w-64 bg-[#006D5B] shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.page}>
                <button
                  className={`block w-full text-left py-2 text-white hover:bg-white/10 px-3 rounded transition-colors ${
                    currentPage === item.page ? 'bg-white/10' : ''
                  }`}
                  onClick={() => onPageChange(item.page)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2 text-white px-3 py-2">
              <Globe2 className="h-4 w-4" />
              <select 
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer w-full"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'it' | 'ar' | 'fr')}
              >
                <option value="it" className="text-gray-900">Italiano</option>
                <option value="ar" className="text-gray-900">العربية</option>
                <option value="fr" className="text-gray-900">Français</option>
              </select>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;