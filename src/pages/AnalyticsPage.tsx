import React from 'react';
import { BarChart3, Users, TrendingUp, Globe, Clock, Eye, Calendar, Award } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const AnalyticsPage = () => {
  const { articles } = useArticles();

  // Calculate analytics data
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const avgReadingTime = Math.round(
    articles.reduce((sum, article) => sum + article.readingTime, 0) / articles.length || 0
  );
  
  const topArticles = articles
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const categoryStats = ['تقنية', 'صحة', 'رياضة', 'ترفيه', 'ثقافة'].map(category => {
    const categoryArticles = articles.filter(article => article.category === category);
    const categoryViews = categoryArticles.reduce((sum, article) => sum + article.views, 0);
    return {
      category,
      count: categoryArticles.length,
      views: categoryViews,
      percentage: totalViews > 0 ? Math.round((categoryViews / totalViews) * 100) : 0
    };
  });

  // Mock data for analytics
  const mockAnalytics = {
    dailyVisitors: 1247,
    weeklyVisitors: 8935,
    monthlyVisitors: 34782,
    trafficSources: [
      { source: 'Google', percentage: 45 },
      { source: 'مباشر', percentage: 28 },
      { source: 'تويتر', percentage: 15 },
      { source: 'فيسبوك', percentage: 12 }
    ],
    topCountries: [
      { country: 'السعودية', percentage: 35 },
      { country: 'الإمارات', percentage: 18 },
      { country: 'مصر', percentage: 15 },
      { country: 'الكويت', percentage: 12 },
      { country: 'قطر', percentage: 10 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            الإحصائيات والتحليلات
          </h1>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockAnalytics.dailyVisitors.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">زوار اليوم</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 ml-1" />
              +12% من أمس
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockAnalytics.weeklyVisitors.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">زوار الأسبوع</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 ml-1" />
              +8% من الأسبوع الماضي
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalViews.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">إجمالي المشاهدات</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 ml-1" />
              +15% من الشهر الماضي
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgReadingTime}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">متوسط وقت القراءة (دقيقة)</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 ml-1" />
              معدل جيد للقراءة
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Articles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                المقالات الأكثر قراءة
              </h2>
            </div>
            
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate" dir="rtl">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span>{article.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                أداء الأقسام
              </h2>
            </div>
            
            <div className="space-y-4">
              {categoryStats.map(stat => (
                <div key={stat.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stat.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.count} مقال - {stat.views.toLocaleString()} مشاهدة
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-sky-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                    {stat.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                مصادر الزيارات
              </h2>
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.trafficSources.map(source => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {source.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                الدول الأكثر زيارة
              </h2>
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.topCountries.map((country, index) => (
                <div key={country.country} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {country.country}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                        {country.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              إحصائيات أكثر تفصيلاً قادمة!
            </h3>
            <p className="text-blue-100 mb-6" dir="rtl">
              سنقوم قريباً بربط الموقع مع Google Analytics و Plausible للحصول على إحصائيات دقيقة ومفصلة
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Google Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>تتبع المشاهدات الفعلية</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>تحليل سلوك المستخدمين</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;