import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Star } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import AdSpace from '../components/AdSpace';

const HomePage = () => {
  const { articles, featuredArticle } = useArticles();
  
  const categories = ['تقنية', 'صحة', 'رياضة', 'ترفيه', 'ثقافة'];
  
  const getArticlesByCategory = (category: string) => {
    return articles.filter(article => article.category === category).slice(0, 3);
  };

  const latestArticles = articles
    .filter(article => !article.isFeatured)
    .slice(0, 6);

  const featuredArticles = articles
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSpace size="leaderboard" position="top" />
      </div>

      {/* Hero Section */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ArticleCard article={featuredArticle} variant="featured" />
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">مقالات مميزة</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Middle Ad Space */}
        <div className="my-12">
          <AdSpace size="rectangle" position="middle" />
        </div>

        {/* Latest Articles */}
        {latestArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-6 w-6 text-sky-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">أحدث المقالات</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-sky-500 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Category Sections */}
        {categories.map(category => {
          const categoryArticles = getArticlesByCategory(category);
          
          if (categoryArticles.length === 0) return null;
          
          return (
            <section key={category} className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-transparent"></div>
                </div>
                <Link
                  to={`/category/${category}`}
                  className="text-emerald-500 hover:text-emerald-600 font-medium text-sm transition-colors"
                >
                  عرض الكل ←
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom Ad Space */}
        <div className="my-12">
          <AdSpace size="banner" position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;