import React, { useState, useEffect } from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarLink from './NavbarLink';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import { Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  currentPage: 'home' | 'guides' | 'news' | 'events' | 'profile' | 'contact' | 'dashboard';
  onPageChange: (page: 'home' | 'guides' | 'news' | 'events' | 'profile' | 'contact' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav_home'), page: 'home' as const },
    { label: t('nav_news'), page: 'news' as const },
    { label: t('nav_events'), page: 'events' as const },
    { label: 'Guide', page: 'guides' as const },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-[#006D5B] transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <NavbarLogo onHomeClick={() => onPageChange('home')} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-4">
              <ul className="flex space-x-2">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <NavbarLink
                      isActive={currentPage === link.page}
                      onClick={() => onPageChange(link.page)}
                    >
                      {link.label}
                    </NavbarLink>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center space-x-4 ml-4">
                <SearchBar 
                  className="hidden sm:block" 
                  onNewsSelect={() => onPageChange('news')}
                />
                <LoginButton 
                  onProfileClick={() => onPageChange('profile')}
                  onDashboardClick={() => onPageChange('dashboard')}
                />
              </div>
            </nav>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-4 lg:hidden">
              <SearchBar onNewsSelect={() => onPageChange('news')} />
              <LoginButton 
                onProfileClick={() => onPageChange('profile')}
                onDashboardClick={() => onPageChange('dashboard')}
              />
              <button
                type="button"
                className="rounded-md p-2 text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onPageChange={(page) => {
          onPageChange(page);
          setIsMobileMenuOpen(false);
        }}
      />

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;