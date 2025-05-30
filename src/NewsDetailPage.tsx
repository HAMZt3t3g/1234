import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import Comments from '../components/Comments';
import BackNavigation from '../components/BackNavigation';
import { useLanguage } from '../contexts/LanguageContext';
import { useHistory } from '../hooks/useHistory';

interface NewsDetailPageProps {
  newsId: string;
  setCurrentPage: (page: 'home' | 'news') => void;
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsId, setCurrentPage }) => {
  const { news, loading, error } = useNews();
  const [newsItem, setNewsItem] = useState<any>(null);
  const { t } = useLanguage();

  // Handle browser history
  useHistory(newsId, () => setCurrentPage('news'));

  useEffect(() => {
    const item = news.find(n => n.id === newsId);
    setNewsItem(item);
  }, [newsId, news]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-red-600">
            {error || 'Notizia non trovata'}
          </p>
          <button
            onClick={() => setCurrentPage('news')}
            className="mt-4 text-[#006D5B] hover:text-[#005A4B] transition-colors"
          >
            Torna alle notizie
          </button>
        </div>
      </div>
    );
  }

  const newsCategories = {
    Cultura: "bg-purple-600",
    Eventi: "bg-[#FFA500]",
    Istruzione: "bg-[#006D5B]",
    Lavoro: "bg-blue-600",
    Sociale: "bg-red-600",
    Politica: "bg-teal-600",
    Sport: "bg-emerald-600",
    Economia: "bg-indigo-600"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="container mx-auto max-w-4xl">
        <div className="flex justify-end mb-8">
          <BackNavigation 
            onClick={() => setCurrentPage('news')} 
            label="Torna alle notizie"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img 
              src={newsItem.imageUrl} 
              alt={newsItem.title}
              className="w-full h-96 object-cover"
            />
            <span 
              className={`absolute top-4 left-4 ${
                newsCategories[newsItem.category as keyof typeof newsCategories]
              } text-white text-sm px-3 py-1 rounded-full`}
            >
              {newsItem.category}
            </span>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 font-montserrat text-gray-900">
              {newsItem.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm mb-8 font-lato">
              <Clock className="h-4 w-4 mr-2" />
              {new Date(newsItem.date).toLocaleDateString()}
              <span className="mx-2">•</span>
              <span className="text-[#006D5B]">{newsItem.author}</span>
            </div>

            <div className="prose max-w-none mb-12">
              <p className="text-gray-700 font-lato leading-relaxed whitespace-pre-line">
                {newsItem.content}
              </p>
            </div>

            <hr className="my-12 border-gray-200" />

            <Comments />
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;