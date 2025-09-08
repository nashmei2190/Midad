import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, ArrowRight, TrendingUp } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import AdSpace from '../components/AdSpace';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { articles } = useArticles();

  const categoryArticles = articles.filter(article => 
    article.category === category
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'تقنية': return '💻';
      case 'صحة': return '🩺';
      case 'رياضة': return '⚽';
      case 'ترفيه': return '🎬';
      case 'ثقافة': return '📚';
      default: return '📝';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'تقنية': return 'from-blue-500 to-cyan-500';
      case 'صحة': return 'from-green-500 to-emerald-500';
      case 'رياضة': return 'from-orange-500 to-red-500';
      case 'ترفيه': return 'from-purple-500 to-pink-500';
      case 'ثقافة': return 'from-amber-500 to-yellow-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الفئة غير موجودة</h2>
          <Link to="/" className="text-amber-500 hover:text-amber-600 font-medium">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSpace size="leaderboard" position="top" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">{category}</span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mb-6 text-4xl`}>
            {getCategoryIcon(category)}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-sky-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300" dir="rtl">
            استكشف مقالاتنا في قسم {category}
          </p>
          <div className="mt-4">
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">
              {categoryArticles.length} مقال
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {categoryArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Middle Ad Space */}
            <div className="my-16">
              <AdSpace size="rectangle" position="middle" />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <Tag className="h-24 w-24 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" dir="rtl">
              لا توجد مقالات في هذا القسم بعد
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto" dir="rtl">
              نعمل على إضافة محتوى جديد في قسم {category}. تابعنا للحصول على آخر التحديثات!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-sky-600 transition-all duration-300"
            >
              العودة إلى الصفحة الرئيسية
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">أقسام أخرى</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['تقنية', 'صحة', 'رياضة', 'ترفيه', 'ثقافة']
              .filter(cat => cat !== category)
              .map(cat => {
                const catArticles = articles.filter(article => article.category === cat);
                return (
                  <Link
                    key={cat}
                    to={`/category/${cat}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group transform hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-3">
                      {getCategoryIcon(cat)}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                      {cat}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {catArticles.length} مقال
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-16">
          <AdSpace size="banner" position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;