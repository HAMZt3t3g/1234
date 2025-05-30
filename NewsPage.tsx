import React, { useState } from 'react';
import { Clock, Search, Loader2 } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import { useLanguage } from '../contexts/LanguageContext';
import BackNavigation from '../components/BackNavigation';

interface NewsItemProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  author: string;
  onReadMore: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ 
  title, 
  excerpt,
  date, 
  imageUrl, 
  category, 
  categoryColor,
  author,
  onReadMore
}) => {
  const { t } = useLanguage();
  
  return (
    <article 
      onClick={onReadMore}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group focus-within:ring-2 focus-within:ring-[#006D5B] focus-within:ring-offset-2"
      tabIndex={0}
      role="button"
      aria-label={`Leggi l'articolo: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onReadMore();
        }
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-4 left-4 ${categoryColor} text-white text-sm px-3 py-1 rounded-full`}>
          {category}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 font-montserrat group-hover:text-[#006D5B] transition-colors">{title}</h2>
        <div className="flex items-center text-gray-500 text-sm mb-4 font-lato">
          <Clock className="h-4 w-4 mr-2" />
          {new Date(date).toLocaleDateString()}
          <span className="mx-2">•</span>
          <span className="text-[#006D5B]">{author}</span>
        </div>
        <p className="text-gray-600 font-lato line-clamp-3 mb-4">{excerpt}</p>
        <span className="text-[#006D5B] group-hover:translate-x-1 transition-transform inline-flex items-center text-sm font-medium">
          {t('read_more')}
        </span>
      </div>
    </article>
  );
};

interface NewsPageProps {
  setCurrentPage: (page: 'home' | 'guides' | 'community' | 'news') => void;
  onNewsSelect: (id: string) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ setCurrentPage, onNewsSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { news, loading, error } = useNews();
  const { t } = useLanguage();

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

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackNavigation 
          onClick={() => setCurrentPage('home')} 
          label="Torna alla homepage"
        />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-montserrat">{t('news_title')}</h1>
          <p className="text-gray-600 max-w-2xl font-lato">{t('news_description')}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder={t('search_news')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#006D5B] shadow-sm"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(newsCategories).map(([category, color]) => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className={`${color} text-white text-sm px-3 py-1 rounded-full hover:opacity-90 transition-opacity capitalize`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-[#006D5B] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredNews.map((item) => (
              <NewsItem
                key={item.id}
                {...item}
                categoryColor={newsCategories[item.category as keyof typeof newsCategories]}
                onReadMore={() => onNewsSelect(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;