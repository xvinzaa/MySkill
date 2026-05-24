import { Link } from 'react-router-dom';
import { Play, BookOpen, Clock, User, ChevronRight } from 'lucide-react';

const ContentCard = ({ content }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    const iconClass = "h-4 w-4";
    switch (category) {
      case 'Automotive Repair':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 11l1.5-4.5A2 2 0 017.4 5h9.2a2 2 0 011.9 1.5L19 11M5 11h14M5 11a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2M7 15h0M12 15h0M17 15h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 'Welding':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 'Electrical Installation':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 'Home Repair':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 'Mechanical Tools':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'Woodworking':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="card card-hover group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={content.thumbnail || `https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop`}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-text-primary flex items-center space-x-1">
            {getCategoryIcon(content.category)}
            <span>{content.category}</span>
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
            {content.difficulty}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <div className="flex items-center space-x-4 text-xs text-text-secondary mb-3">
          <span className="flex items-center space-x-1">
            {content.type === 'Video' ? (
              <Play className="h-3 w-3 text-primary" />
            ) : (
              <BookOpen className="h-3 w-3 text-accent" />
            )}
            <span>{content.type}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{content.duration}</span>
          </span>
        </div>

        <h3 className="font-semibold text-text-primary text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {content.title}
        </h3>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {content.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1 text-xs text-text-secondary">
            <User className="h-3 w-3" />
            <span className="truncate max-w-[120px]">{content.author}</span>
          </span>
          <Link
            to={`/detail/${content._id}`}
            className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors duration-200"
          >
            <span>View Detail</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
