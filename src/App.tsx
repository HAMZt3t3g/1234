import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Stats from './Stats';
import FeatureCards from './FeatureCards';
import NewsSection from './NewsSection';
import TrendingMorocco from './TrendingMorocco';
import GuidesPage from './pages/GuidesPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import UserDashboardPage from './pages/UserDashboardPage';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import { AuthProvider } from './AuthContext';
import { Toaster } from 'react-hot-toast';
import { useScrollToTop } from './hooks/useScrollToTop';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'guides' | 'news' | 'events' | 'profile' | 'contact' | 'dashboard'>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // Scroll to top when page changes
  useScrollToTop(currentPage);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Stats />
            <NewsSection 
              setCurrentPage={setCurrentPage} 
              onNewsSelect={(id) => {
                setSelectedNewsId(id);
                setCurrentPage('news');
              }}
            />
            <TrendingMorocco />
            <FeatureCards setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === 'guides' ? (
          <GuidesPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'events' ? (
          <EventsPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'profile' ? (
          <ProfilePage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'contact' ? (
          <ContactPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'dashboard' ? (
          <UserDashboardPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'news' && selectedNewsId ? (
          <NewsDetailPage 
            newsId={selectedNewsId} 
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <NewsPage 
            setCurrentPage={setCurrentPage}
            onNewsSelect={(id) => setSelectedNewsId(id)}
          />
        )}
        <Footer onContactClick={() => setCurrentPage('contact')} />
        <CookieConsent />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;