import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, ChevronRight, BookOpen, Video, Clock, User, TrendingUp } from 'lucide-react';
import { contentAPI } from '../api/axios';
import ContentCard from '../components/ContentCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('home');

  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, []);

  useEffect(() => {
    const view = searchParams.get('view');
    const category = searchParams.get('category');
    if (view) setViewMode(view);
    if (category) setSelectedCategory(category);
  }, [location, searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await contentAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchContents = async (search = '', category = '') => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const response = await contentAPI.getAll(params);
      setContents(response.data);
    } catch (err) {
      setError('Failed to load content. Please try again.');
      console.error('Failed to fetch contents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchContents(searchTerm, selectedCategory);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchParams({ category: categoryName });
    fetchContents(searchTerm, categoryName);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSearchParams({});
    fetchContents('', '');
  };

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">About My Skill</h1>
        <p className="text-xl text-text-secondary">Empowering SMK Students with Technical Excellence</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-3">Our Mission</h3>
          <p className="text-text-secondary leading-relaxed">
            My Skill is dedicated to providing comprehensive technical education resources for SMK students across Indonesia. We believe in hands-on learning and practical skill development.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-3">What We Offer</h3>
          <p className="text-text-secondary leading-relaxed">
            From automotive repair to woodworking, our platform covers a wide range of technical disciplines with detailed tutorials, videos, and step-by-step guides.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
        <p className="mb-4">
          Connect with thousands of students and teachers passionate about technical education. Share knowledge, learn new skills, and advance your career.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold">500+</span>
            <p className="text-sm">Students</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold">50+</span>
            <p className="text-sm">Tutorials</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold">6</span>
            <p className="text-sm">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSaved = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-8">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-text-primary">My Saved Content</h1>
      </div>

      {contents.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-10 w-10 text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No saved content yet</h3>
          <p className="text-text-secondary mb-6">Start exploring tutorials and save your favorites!</p>
          <button onClick={clearFilters} className="btn-primary">
            Explore Content
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <ContentCard key={content._id} content={content} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <main>
      {viewMode === 'about' && renderAbout()}
      {viewMode === 'saved' && renderSaved()}
      {viewMode !== 'about' && viewMode !== 'saved' && (
        <>
          <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
                <span className="text-blue-200 font-medium">Welcome to My Skill</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
                Explore Technical Skills from SMK Practice Projects
              </h1>
              <p className="text-blue-100 text-lg max-w-xl mb-8">
                Discover hands-on tutorials and guides created by SMK students and teachers. Learn automotive repair, welding, electrical installation, and more.
              </p>

              <form onSubmit={handleSearch} className="max-w-xl">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search tutorials..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <button type="submit" className="btn-accent px-6">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Categories</h2>
                {selectedCategory && (
                  <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                    Clear filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.name}
                    category={category}
                  />
                ))}
              </div>

              {selectedCategory && (
                <div className="mb-8 flex items-center space-x-2">
                  <span className="text-text-secondary">Showing results for:</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>{selectedCategory}</span>
                    <button onClick={clearFilters} className="hover:text-blue-800">×</button>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  {selectedCategory ? 'Filtered Results' : 'Featured Tutorials'}
                </h2>
                <span className="text-text-secondary text-sm">
                  {contents.length} {contents.length === 1 ? 'tutorial' : 'tutorials'} available
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button onClick={() => fetchContents()} className="btn-primary">
                    Try Again
                  </button>
                </div>
              ) : contents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-10 w-10 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">No tutorials found</h3>
                  <p className="text-text-secondary mb-6">Try adjusting your search or browse all categories</p>
                  <button onClick={clearFilters} className="btn-outline">
                    Browse All Tutorials
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contents.map((content) => (
                    <ContentCard key={content._id} content={content} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <footer className="bg-white border-t border-gray-100 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-secondary text-sm">
            My Skill - SMK Technical Skills Platform. Built for students, by students.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
