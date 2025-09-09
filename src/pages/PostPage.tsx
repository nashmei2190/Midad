import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import AdSpace from '../components/AdSpace';

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const { getArticleBySlug, articles } = useArticles();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - مِداد`;
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المقال غير موجود</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-sky-600 transition-all duration-300"
          >
            العودة إلى الصفحة الرئيسية
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const shareUrl = window.location.href;
  const shareTitle = article.title;

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
            <ArrowRight className="h-4 w-4" />
            <Link to={`/category/${article.category}`} className="hover:text-amber-500 transition-colors">
              {article.category}
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white truncate">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gradient-to-r from-amber-500 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight" dir="rtl">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed" dir="rtl">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{article.readingTime} دقيقة قراءة</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-600 dark:text-gray-400 font-medium">شارك المقال:</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <button
                onClick={() => navigator.share({ title: shareTitle, url: shareUrl })}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>
        )}

        {/* Middle Ad Space */}
        <div className="my-8">
          <AdSpace size="rectangle" position="middle" />
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
            dir="rtl"
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(/\n/g, '<br />') 
            }} 
          />
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-white">الكلمات المفتاحية:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-800 dark:hover:text-amber-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Ad Space */}
        <div className="my-8">
          <AdSpace size="banner" position="bottom" />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8" dir="rtl">
              مقالات ذات صلة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default PostPage;