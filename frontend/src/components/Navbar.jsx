import { Link, useLocation } from 'react-router-dom';
import { Wrench, LogOut, Home, Grid, BookOpen, Info, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/?view=categories', icon: Grid },
    { name: 'My Practice', path: '/?view=saved', icon: BookOpen },
    { name: 'About', path: '/?view=about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.search;
    if (path.includes('view=')) {
      const viewName = path.split('view=')[1];
      return location.search.includes(`view=${viewName}`);
    }
    return false;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              My<span className="text-primary">Skill</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 text-text-secondary">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {user.role}
                </span>
              </div>
            )}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-red-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-primary"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-slideIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/5'
                    : 'text-text-secondary hover:text-primary hover:bg-gray-50'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-4 pt-4 px-4">
              {user && (
                <div className="flex items-center space-x-2 text-text-secondary mb-3">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.fullName}</span>
                </div>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
