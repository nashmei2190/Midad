import React, { useState } from 'react';
import { Shield, Plus, Edit3, Trash2, Star, Save, Eye, EyeOff } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types/Article';

const AdminPage = () => {
  const { articles, addArticle, updateArticle, deleteArticle, setFeaturedArticle } = useArticles();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'تقنية' as 'تقنية' | 'صحة' | 'رياضة' | 'ترفيه' | 'ثقافة',
    tags: '',
    isFeatured: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('يرجى ملء العنوان والمحتوى على الأقل');
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || formData.content.slice(0, 160),
      featuredImage: formData.featuredImage || 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      author: 'فريق مِداد',
      isFeatured: formData.isFeatured,
      readingTime: Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200)),
      slug: formData.title.toLowerCase().replace(/[^\u0621-\u064Aa-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    };

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, payload);
        setEditingArticle(null);
      } else {
        await addArticle(payload);
      }

      setFormData({
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        category: 'تقنية',
        tags: '',
        isFeatured: false
      });
      setShowForm(false);
    } catch (error) {
      console.error('خطأ في حفظ المقال:', error);
      alert('حدث خطأ أثناء حفظ المقال');
    }
  };

  const startEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      category: article.category,
      tags: article.tags.join(', '),
      isFeatured: article.isFeatured
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        await deleteArticle(id);
      } catch (error) {
        console.error('خطأ في حذف المقال:', error);
        alert('حدث خطأ أثناء حذف المقال');
      }
    }
  };

  const handleSetFeatured = async (id: string) => {
    try {
      await setFeaturedArticle(id);
    } catch (error) {
      console.error('خطأ في تعيين المقال المميز:', error);
      alert('حدث خطأ أثناء تعيين المقال المميز');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              لوحة التحكم
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              يرجى إدخال كلمة المرور للوصول
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-sky-500 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-600 hover:to-sky-600 transition-all duration-300"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              {articles.length} مقال
            </span>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingArticle(null);
                setFormData({
                  title: '',
                  content: '',
                  excerpt: '',
                  featuredImage: '',
                  category: 'تقنية',
                  tags: '',
                  isFeatured: false
                });
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-sky-600 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              مقال جديد
            </button>
          </div>
        </div>

        {/* Article Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingArticle ? 'تعديل المقال' : 'إضافة مقال جديد'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  العنوان *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="اكتب عنوان المقال"
                  required
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  القسم *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="تقنية">تقنية</option>
                  <option value="صحة">صحة</option>
                  <option value="رياضة">رياضة</option>
                  <option value="ترفيه">ترفيه</option>
                  <option value="ثقافة">ثقافة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رابط الصورة المميزة
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://images.pexels.com/photos/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  مقتطف قصير
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="مقتطف قصير عن المقال (اختياري)"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نص المقال *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="اكتب محتوى المقال هنا..."
                  required
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الكلمات المفتاحية
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="كلمة1, كلمة2, كلمة3"
                  dir="rtl"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  افصل الكلمات بفواصل
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                  جعل هذا المقال مميزاً (سيظهر في الصفحة الرئيسية)
                </label>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  {editingArticle ? 'تحديث المقال' : 'حفظ المقال'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArticle(null);
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              المقالات المنشورة
            </h3>
          </div>
          
          {articles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">لا توجد مقالات بعد</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {articles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate" dir="rtl">
                          {article.title}
                        </h4>
                        {article.isFeatured && (
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-full text-xs font-medium">
                            مميز
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{article.category}</span>
                        <span>{article.readingTime} دقيقة قراءة</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSetFeatured(article.id)}
                        className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                        title="جعل مميز"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;