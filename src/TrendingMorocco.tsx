import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}

function TrendingMorocco() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const cacheKey = 'youtube_trending_ma';
    const cacheExpiry = 1000 * 60 * 15; // 15 minutes

    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheExpiry) {
        setVideos(data);
        setLoading(false);
        return;
      }
    }
    
    if (!apiKey) {
      setError('YouTube API key is not configured');
      setLoading(false);
      return;
    }

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=MA&maxResults=6&key=${apiKey}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error.message || 'Failed to fetch videos');
        }
        setVideos(data.items);
        // Cache the response
        localStorage.setItem(cacheKey, JSON.stringify({
          data: data.items,
          timestamp: Date.now()
        }));
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        setError('Failed to load trending videos. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-[#006D5B] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-montserrat">Video in tendenza in Marocco</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="aspect-video relative">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 group-hover:text-[#006D5B] transition-colors font-montserrat">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-lato">
                  {formatViewCount(video.statistics.viewCount)} visualizzazioni
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingMorocco;