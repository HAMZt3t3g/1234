import React, { useState } from 'react';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';

interface LoginButtonProps {
  onProfileClick: () => void;
  onDashboardClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onProfileClick, onDashboardClick }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <div className="relative group">
        <button 
          onClick={onProfileClick}
          className="flex items-center gap-2 bg-[#FFA500] hover:bg-[#FF9000] px-4 py-2 rounded-lg text-white transition-colors"
        >
          <img
            src={user.avatar || "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="hidden sm:inline">{user.name}</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <button
            onClick={onDashboardClick}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={onProfileClick}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            {t('nav_profile')}
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="flex items-center gap-2 bg-[#FFA500] hover:bg-[#FF9000] px-4 py-2 rounded-lg text-white transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="hidden sm:inline">{t('login')}</span>
      </button>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default LoginButton;