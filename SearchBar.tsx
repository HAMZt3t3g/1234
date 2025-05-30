import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
  onNewsSelect?: (newsId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', onNewsSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { news } = useNews();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const filteredNews = news
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleNewsClick = (newsId: string) => {
    if (onNewsSelect) {
      onNewsSelect(newsId);
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <button
        onClick={handleSearchExpand}
        className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Toggle search"
        aria-expanded={isExpanded}
        aria-controls="search-suggestions"
      >
        <Search className="h-5 w-5" />
      </button>
      
      <div
        className={`absolute right-0 top-full mt-2 w-80 transition-all duration-200 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_news')}
              className="w-full px-4 py-3 pr-10 focus:outline-none border-b"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              role="combobox"
              aria-expanded={isExpanded}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {searchQuery && (
            <ul
              id="search-suggestions"
              role="listbox"
              className="max-h-64 overflow-y-auto"
            >
              {filteredNews.length > 0 ? (
                filteredNews.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNewsClick(item.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 group"
                      role="option"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover:text-[#006D5B] transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <span className="text-[#006D5B]">{item.category}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-500 text-center">
                  {t('no_results_found')}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;