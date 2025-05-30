import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Iscrizione alla newsletter completata!');
      setEmail('');
    } catch (error) {
      toast.error('Errore durante l\'iscrizione. Riprova più tardi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h3 className="text-white text-lg font-semibold mb-2">
        {t('subscribe_newsletter')}
      </h3>
      <p className="text-gray-300 text-sm mb-4">
        Ricevi aggiornamenti su eventi, notizie e opportunità della comunità
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="La tua email"
          required
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#006D5B]"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005A4B] transition-colors flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">{t('subscribe')}</span>
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;