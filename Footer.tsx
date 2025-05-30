import React from 'react';
import { Compass, Globe2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import NewsletterForm from './NewsletterForm';

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-[#1F2937] text-gray-300">
      {/* Upper section with logos */}
      <div className="container mx-auto px-4 py-12 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">MaghrebItalia</span>
            </div>
            <p className="max-w-md text-sm">
              La piattaforma che unisce le comunità del Maghreb e dell'Italia, 
              promuovendo lo scambio culturale e il supporto reciproco.
            </p>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-3">Esplora</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eventi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Notizie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Supporto</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={onContactClick}
                    className="hover:text-white transition-colors"
                  >
                    Contatti
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risorse</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter form */}
          <div className="lg:col-span-2">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Lower section with legal links */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            © {currentYear} MaghrebItalia. Tutti i diritti riservati.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini d'uso</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;