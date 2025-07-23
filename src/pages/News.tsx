import React, { useEffect, useState } from 'react';
import '../styles/News.css';

type NewsItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  };
  type: 'news' | 'social' | 'reddit';
  author?: string;
  content?: string;
};

type RedditPost = {
  id: string;
  title: string;
  selftext: string;
  url: string;
  created_utc: number;
  author: string;
  score: number;
  num_comments: number;
  subreddit: string;
};

const getIcon = (type: string, source?: string) => {
  if (type === 'social') {
    if (source?.toLowerCase().includes('twitter') || source?.toLowerCase().includes('x.com')) return '𝕏';
    if (source?.toLowerCase().includes('instagram')) return '📷';
    return '📱';
  }
  if (type === 'reddit') return '🔴';
  if (source?.toLowerCase().includes('espn')) return '🏀';
  if (source?.toLowerCase().includes('athletic')) return '⚡';
  if (source?.toLowerCase().includes('bleacher')) return '📰';
  if (source?.toLowerCase().includes('nba.com')) return '🏆';
  return '📰';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

// News API configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'your-news-api-key-here';
const NEWS_API_BASE = 'https://newsapi.org/v2';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'social' | 'reddit'>('all');

  // Fetch news from News API
  const fetchNewsAPI = async (): Promise<NewsItem[]> => {
    try {
      const queries = [
        'LA Clippers',
        'Los Angeles Clippers',
        'Kawhi Leonard',
        'Paul George',
        'James Harden'
      ];
      
      const allResults = await Promise.all(
        queries.map(async (query) => {
          const response = await fetch(
            `${NEWS_API_BASE}/everything?q="${encodeURIComponent(query)}"&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`
          );
          
          if (!response.ok) {
            console.warn(`News API request failed for "${query}":`, response.statusText);
            return [];
          }
          
          const data = await response.json();
          return data.articles || [];
        })
      );
      
      const combinedArticles = allResults.flat();
      
      // Remove duplicates and convert to NewsItem format
      const uniqueArticles = combinedArticles
        .filter((article, index, self) => 
          index === self.findIndex(a => a.url === article.url)
        )
        .filter(article => 
          article.title && 
          article.publishedAt && 
          !article.title.toLowerCase().includes('[removed]')
        )
        .map((article): NewsItem => ({
          id: article.url,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source,
          type: 'news',
          author: article.author,
          content: article.content
        }));
      
      return uniqueArticles.slice(0, 15); // Limit to 15 most recent
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  };

  // Fetch Reddit posts
  const fetchRedditPosts = async (): Promise<NewsItem[]> => {
    try {
      const subreddits = ['LAClippers', 'nba'];
      const allPosts = await Promise.all(
        subreddits.map(async (subreddit) => {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`
          );
          
          if (!response.ok) {
            console.warn(`Reddit request failed for r/${subreddit}:`, response.statusText);
            return [];
          }
          
          const data = await response.json();
          return data.data?.children || [];
        })
      );
      
      const combinedPosts = allPosts.flat();
      
      return combinedPosts

        .map((post): NewsItem => ({
          id: post.id,
          title: post.title,
          description: post.selftext ? post.selftext.substring(0, 200) + '...' : '',
          url: `https://reddit.com${post.url.startsWith('/r/') ? post.url : '/r/' + post.subreddit + '/comments/' + post.id}`,
          publishedAt: new Date(post.created_utc * 1000).toISOString(),
          source: {
            name: `r/${post.subreddit}`
          },
          type: 'reddit',
          author: post.author
        }))
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching Reddit posts:', error);
      return [];
    }
  };

  // Mock social media posts (since Twitter API requires special access)
  const getMockSocialPosts = (): NewsItem[] => {
    const mockPosts = [
      {
        id: 'social-1',
        title: 'Kawhi Leonard drops 28pts in practice scrimmage 🔥',
        description: 'The Klaw looking sharp ahead of tonight\'s game',
        url: '#',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: { name: 'X (Twitter)' },
        type: 'social' as const,
        author: '@ClipperNation'
      },
      {
        id: 'social-2', 
        title: 'PG13 confirms he\'s ready for tonight: "Feel great, ready to ball"',
        description: 'Paul George speaking to media about his health status',
        url: '#',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source: { name: 'X (Twitter)' },
        type: 'social' as const,
        author: '@LAClippers'
      },
      {
        id: 'social-3',
        title: 'James Harden working on his step-back in warmups 👀',
        description: 'The Beard getting his shots up before tip-off',
        url: '#',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        source: { name: 'Instagram' },
        type: 'social' as const,
        author: '@jharden13'
      }
    ];
    
    return mockPosts;
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [newsItems, redditItems] = await Promise.all([
          fetchNewsAPI(),
          fetchRedditPosts()
        ]);
        
        const socialItems = getMockSocialPosts();
        
        const allItems = [...newsItems, ...redditItems, ...socialItems]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        
        setNews(allItems);
        
        if (allItems.length === 0) {
          setError('No news items found. This might be due to API limits or connectivity issues.');
        }
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const filteredNews = news.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const refreshNews = () => {
    setNews([]);
    setLoading(true);
    // Trigger useEffect to refetch
    window.location.reload();
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h2 className="title">🗞 Clippers News Hub</h2>
        <button onClick={refreshNews} className="refresh-btn" disabled={loading}>
          {loading ? '🔄' : '↻'} Refresh
        </button>
      </div>
      
      <div className="news-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({news.length})
        </button>
        <button 
          className={`tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News ({news.filter(item => item.type === 'news').length})
        </button>
        <button 
          className={`tab ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Social ({news.filter(item => item.type === 'social').length})
        </button>
        <button 
          className={`tab ${activeTab === 'reddit' ? 'active' : ''}`}
          onClick={() => setActiveTab('reddit')}
        >
          Reddit ({news.filter(item => item.type === 'reddit').length})
        </button>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading latest Clippers news...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={refreshNews} className="retry-btn">Try Again</button>
        </div>
      )}

      {!loading && !error && (
        <div className="timeline">
          {filteredNews.length === 0 ? (
            <div className="no-news">
              <p>No news items found for the selected filter.</p>
            </div>
          ) : (
            filteredNews.map((item) => (
              <div className="timeline-item" key={item.id}>
                <div className="timeline-icon">
                  {getIcon(item.type, item.source.name)}
                </div>
                <div className="timeline-content">
                  <div className="news-header-info">
                    <div className="news-date">{formatDate(item.publishedAt)}</div>
                    <div className="news-source">{item.source.name}</div>
                  </div>
                  <div className="news-title">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </div>
                  {item.description && (
                    <div className="news-description">{item.description}</div>
                  )}
                  {item.author && (
                    <div className="news-author">by {item.author}</div>
                  )}
                  {item.urlToImage && (
                    <div className="news-image">
                      <img src={item.urlToImage} alt="News" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      <div className="api-notice">
        <p><strong>Note:</strong> To enable full functionality, add your News API key to REACT_APP_NEWS_API_KEY in your environment variables.</p>
        <p>Get your free API key at: <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a></p>
      </div>
    </div>
  );
};

export default News;
