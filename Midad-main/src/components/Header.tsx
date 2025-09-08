import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Search, Menu, X, PenTool } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useArticles } from '../hooks/useArticles';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { articles } = useArticles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const categories = ['تقنية', 'صحة', 'رياضة', 'ترفيه', 'ثقافة'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <PenTool className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-sky-500 bg-clip-text text-transparent">
              مِداد
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-900 dark:text-white hover:text-amber-500 transition-colors">
              الرئيسية
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
              >
                {category}
              </Link>
            ))}
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors">
              من نحن
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors">
              اتصل بنا
            </Link>
          </nav>

          {/* Search & Theme Toggle */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {showSearch && (
              <form onSubmit={handleSearch} className="hidden md:flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في المقالات..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  dir="rtl"
                />
              </form>
            )}
            
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/about"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في المقالات..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  dir="rtl"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;