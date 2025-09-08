import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Clock, Tag, Share2, Facebook, Twitter } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import AdSpace from '../components/AdSpace';

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getArticleBySlug, incrementViews, articles } = useArticles();
  
  const article = slug ? getArticleBySlug(slug) : null;

  useEffect(() => {
    if (article) {
      incrementViews(article.id);
    }
  }, [article, incrementViews]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article?.title} - مِداد`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article?.title} - مِداد`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المقال غير موجود</h2>
          <Link to="/" className="text-amber-500 hover:text-amber-600 font-medium">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Ad Space */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSpace size="leaderboard" position="top" />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
            <span>←</span>
            <Link to={`/category/${article.category}`} className="hover:text-amber-500 transition-colors">
              {article.category}
            </Link>
            <span>←</span>
            <span className="text-gray-900 dark:text-white truncate">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-gradient-to-r from-amber-500 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight" dir="rtl">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views.toLocaleString()} مشاهدة</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} دقائق للقراءة</span>
              </div>
            </div>
            <span className="text-amber-500 font-medium">{article.author}</span>
          </div>

          {/* Featured Image */}
          <div className="aspect-video overflow-hidden rounded-xl mb-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none" dir="rtl">
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Middle Ad Space */}
        <div className="my-12">
          <AdSpace size="rectangle" position="middle" />
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-3 mb-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Tag className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-amber-100 hover:text-amber-800 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mb-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Share2 className="h-5 w-5" />
            <span className="font-medium">شارك المقال:</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={shareOnWhatsApp}
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              واتساب
            </button>
            
            <button
              onClick={shareOnTwitter}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              تويتر
            </button>
            
            <button
              onClick={shareOnFacebook}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              فيسبوك
            </button>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mb-12">
          <AdSpace size="rectangle" position="bottom" />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" dir="rtl">
              مقالات ذات صلة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <Link
                  key={relatedArticle.id}
                  to={`/post/${relatedArticle.slug}`}
                  className="group block"
                >
                  <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-amber-500 transition-colors" dir="rtl">
                        {relatedArticle.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {relatedArticle.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedArticle.readingTime}د
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default PostPage;