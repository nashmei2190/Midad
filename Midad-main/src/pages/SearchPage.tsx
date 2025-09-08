import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, Clock } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { articles } = useArticles();
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    if (query) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        article.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [query, articles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Search className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            البحث في مِداد
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300" dir="rtl">
            ابحث عن المقالات والمواضيع التي تهمك
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المقالات، العناوين، والوسوم..."
                className="w-full pl-4 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
                dir="rtl"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                بحث
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-sky-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                نتائج البحث عن "{query}"
              </h2>
              <span className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-3 py-1 rounded-full text-sm">
                {filteredArticles.length} نتيجة
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-24 w-24 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" dir="rtl">
                  لم نجد أي نتائج
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6" dir="rtl">
                  لم نجد أي مقالات تطابق بحثك عن "{query}"
                </p>
                <div className="space-y-2 text-gray-600 dark:text-gray-300" dir="rtl">
                  <p>جرب:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>التحقق من الإملاء</li>
                    <li>استخدام كلمات مختلفة</li>
                    <li>استخدام كلمات أكثر عمومية</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Popular Searches or Recent Articles when no query */}
        {!query && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-24 w-24 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4" dir="rtl">
              ابحث في مكتبة مِداد
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8" dir="rtl">
              استكشف مقالاتنا في التقنية، الصحة، الرياضة، الثقافة، والترفيه
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
              {['تقنية', 'صحة', 'رياضة', 'ترفيه', 'ثقافة'].map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {category === 'تقنية' && '💻'}
                      {category === 'صحة' && '🩺'}
                      {category === 'رياضة' && '⚽'}
                      {category === 'ترفيه' && '🎬'}
                      {category === 'ثقافة' && '📚'}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium group-hover:text-amber-500 transition-colors">
                      {category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;