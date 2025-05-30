import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import BackNavigation from '../components/BackNavigation';

interface ContactPageProps {
  setCurrentPage: (page: 'home' | 'contact') => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackNavigation 
          onClick={() => setCurrentPage('home')} 
          label="Torna alla homepage"
        />

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contattaci</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hai domande, suggerimenti o vuoi collaborare con noi? Compila il form sottostante
            e ti risponderemo il prima possibile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informazioni di contatto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#006D5B] mt-1" />
                  <div>
                    <p className="font-medium">Indirizzo</p>
                    <p className="text-gray-600">
                      Via Roma 123<br />
                      20123 Milano, Italia
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#006D5B] mt-1" />
                  <div>
                    <p className="font-medium">Telefono</p>
                    <a href="tel:+39 02 1234567" className="text-gray-600 hover:text-[#006D5B]">
                      +39 02 1234567
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Orari di apertura</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunedì - Venerdì</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sabato</span>
                  <span className="font-medium">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domenica</span>
                  <span className="font-medium">Chiuso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;