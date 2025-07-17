import React, { useEffect, useState } from 'react';
import '../styles/News.css';

type NewsItem = {
  title: string;
  date: string;
  type?: string;
};

const sampleNews: NewsItem[] = [
  { title: 'Kawhi Leonard cleared for opening night vs Lakers', date: '2025-10-17', type: 'injury' },
  { title: 'Clippers to host Lakers in first Battle of LA', date: '2025-10-18', type: 'game' },
  { title: 'Zubac dominates in preseason win over Suns', date: '2025-10-21', type: 'recap' },
  { title: 'James Harden trade rumors heating up', date: '2025-10-22', type: 'trade' },
  { title: 'Warriors @ Clippers — showdown preview', date: '2025-10-23', type: 'game' },
];

const getIcon = (type?: string) => {
  switch (type) {
    case 'game': return '🏀';
    case 'injury': return '🚑';
    case 'trade': return '💼';
    case 'recap': return '📊';
    default: return '📰';
  }
};

const formatDate = (raw: string) => {
  const d = new Date(raw);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const sorted = [...sampleNews].sort((a, b) => b.date.localeCompare(a.date));
    setNews(sorted);
  }, []);

  return (
    <div className="news-container">
      <h2 className="title">🗞 Clippers News Timeline</h2>
      <div className="timeline">
        {news.map((item, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-icon">{getIcon(item.type)}</div>
            <div className="timeline-content">
              <div className="news-date">{formatDate(item.date)}</div>
              <div className="news-title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
