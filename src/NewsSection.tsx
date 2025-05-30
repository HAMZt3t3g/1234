import React, { useState } from 'react';
import { Clock, Search, Loader2, Plus } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import AdminNewsForm from './AdminNewsForm';
import { useLanguage } from '../contexts/LanguageContext';
import NavigationButton from './NavigationButtons';

interface NewsItemProps {
  id: string;
  title: string;
  excerpt: string;
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
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group focus-within:ring-2 focus-within:ring-[#006D5B] focus-within:ring-offset-2"
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
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <span 
          className={`absolute top-4 left-4 ${categoryColor} text-white text-sm px-3 py-1 rounded-full`}
        >
          {category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 font-montserrat group-hover:text-[#006D5B] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 font-lato">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col text-gray-500 text-sm font-lato">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {new Date(date).toLocaleDateString()}
            </div>
            <span className="text-[#006D5B] mt-1">{author}</span>
          </div>
          <span className="text-[#006D5B] group-hover:translate-x-1 transition-transform inline-flex items-center text-sm font-medium">
            {t('read_more')}
          </span>
        </div>
      </div>
    </article>
  );
};

interface NewsSectionProps {
  setCurrentPage: (page: 'home' | 'guides' | 'community' | 'news') => void;
  onNewsSelect: (id: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ setCurrentPage, onNewsSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminForm, setShowAdminForm] = useState(false);
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
  ).slice(0, 6);

  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900 font-montserrat">{t('latest_news')}</h2>
            <button
              onClick={() => setShowAdminForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005A4B] transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>{t('add_news')}</span>
            </button>
          </div>
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder={t('search_news')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#006D5B] shadow-sm font-lato"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Object.entries(newsCategories).map(([category, color]) => (
            <button
              key={category}
              onClick={() => setSearchQuery(category)}
              className={`${color} text-white text-sm px-3 py-1 rounded-full hover:opacity-90 transition-opacity capitalize font-lato`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-[#006D5B] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <NewsItem
                key={item.id}
                {...item}
                categoryColor={newsCategories[item.category as keyof typeof newsCategories]}
                onReadMore={() => {
                  onNewsSelect(item.id);
                  setCurrentPage('news');
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <NavigationButton onClick={() => setCurrentPage('news')}>
            {t('view_all_news')}
          </NavigationButton>
        </div>
      </div>

      {showAdminForm && (
        <AdminNewsForm onClose={() => setShowAdminForm(false)} />
      )}
    </div>
  );
};

export default NewsSection;