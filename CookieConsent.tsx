import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted.toString());
    setShowBanner(false);

    if (accepted) {
      // Initialize analytics and tracking scripts
      initializeTracking();
    }
  };

  const initializeTracking = () => {
    // Example: Initialize Google Analytics
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'G-XXXXXXXXXX');
  };

  if (!showBanner) return null;

  return (
    <div 
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
    >
      <div className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <h2 id="cookie-consent-title" className="text-gray-800 font-medium mb-2">
            Informativa sui Cookie
          </h2>
          <p className="text-gray-600 text-sm">
            Questo sito utilizza cookie tecnici e di terze parti per migliorare la tua esperienza. 
            Proseguendo la navigazione accetti l'utilizzo dei cookie secondo la nostra policy.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
          <button
            onClick={() => handleConsent(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Rifiuta i cookie"
          >
            Rifiuta
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-6 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005A4B] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B]"
            aria-label="Accetta i cookie"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;