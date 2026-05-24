import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Play, Clock, User, BookOpen, AlertTriangle, Wrench,
  ChevronRight, CheckCircle, Bookmark, Share2, Heart
} from 'lucide-react';
import { contentAPI, authAPI } from '../api/axios';
import ContentCard from '../components/ContentCard';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [relatedContents, setRelatedContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchContent();
    fetchRelatedContent();
    checkIfSaved();
  }, [id]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await contentAPI.getById(id);
      setContent(response.data);
    } catch (err) {
      setError('Failed to load content. Please try again.');
      console.error('Failed to fetch content:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedContent = async () => {
    try {
      const response = await contentAPI.getRelated(id, content?.category);
      setRelatedContents(response.data);
    } catch (err) {
      console.error('Failed to fetch related content:', err);
    }
  };

  const checkIfSaved = async () => {
    try {
      const response = await authAPI.getSavedContents();
      const saved = response.data.some(item => item._id === id);
      setIsSaved(saved);
    } catch (err) {
      console.error('Failed to check saved status:', err);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await authAPI.unsaveContent(id);
        setIsSaved(false);
      } else {
        await authAPI.saveContent(id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Failed to save/unsave content:', err);
    }
  };

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
    const iconClass = "h-5 w-5";
    switch (category) {
      case 'Automotive Repair':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l1.5-4.5A2 2 0 017.4 5h9.2a2 2 0 011.9 1.5L19 11M5 11h14M5 11a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2" /></svg>;
      case 'Welding':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>;
      case 'Electrical Installation':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
      case 'Home Repair':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>;
      case 'Mechanical Tools':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>;
      case 'Woodworking':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Content not found</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/?category=${encodeURIComponent(content.category)}`} className="hover:text-primary transition-colors">
            {content.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-text-primary truncate max-w-[200px]">{content.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="relative h-64 md:h-80 bg-gray-900">
                <img
                  src={content.thumbnail || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop'}
                  alt={content.title}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white text-primary rounded-full p-6 shadow-lg transform hover:scale-105 transition-all">
                    <Play className="h-12 w-12 ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 text-text-secondary mb-2">
                      <span className="flex items-center space-x-1">
                        {content.type === 'Video' ? (
                          <Play className="h-4 w-4 text-primary" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-accent" />
                        )}
                        <span>{content.type}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{content.duration}</span>
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {content.title}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{content.author}</p>
                      <p className="text-sm text-text-secondary">Instructor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isSaved
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                <div className="py-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Description</h2>
                  <p className="text-text-secondary leading-relaxed">{content.description}</p>
                </div>

                {content.toolsNeeded && content.toolsNeeded.length > 0 && (
                  <div className="py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                      <Wrench className="h-5 w-5 text-accent" />
                      <span>Tools Needed</span>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {content.toolsNeeded.map((tool, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-text-primary px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {content.steps && content.steps.length > 0 && (
                  <div className="py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-text-primary mb-6">Step-by-Step Instructions</h2>
                    <div className="space-y-4">
                      {content.steps.map((step, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                              {step.stepNumber}
                            </div>
                          </div>
                          <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                            <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                            <p className="text-text-secondary">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {content.safetyTips && content.safetyTips.length > 0 && (
                  <div className="py-6 border-t border-gray-100">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Safety Tips</span>
                      </h2>
                      <ul className="space-y-3">
                        {content.safetyTips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-3 text-yellow-800">
                            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h3 className="font-bold text-text-primary mb-4">Content Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Category</span>
                    <span className="font-medium text-text-primary flex items-center space-x-1">
                      {getCategoryIcon(content.category)}
                      <span>{content.category}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Type</span>
                    <span className="font-medium text-text-primary">
                      {content.type === 'Video' ? (
                        <span className="flex items-center space-x-1">
                          <Play className="h-4 w-4 text-primary" />
                          <span>Video Tutorial</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4 text-accent" />
                          <span>Article</span>
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Duration</span>
                    <span className="font-medium text-text-primary">{content.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Difficulty</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                      {content.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="btn-outline w-full flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {relatedContents.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Related Content</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedContents.map((item) => (
                <ContentCard key={item._id} content={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Detail;
