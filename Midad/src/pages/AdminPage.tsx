import React, { useState } from 'react';
import { Shield, Plus, Edit3, Trash2, Star, Save } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types/Article';

  const { articles, addArticle, updateArticle, deleteArticle, setFeaturedArticle } = useArticles();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // لا يوجد تسجيل دخول للزوار
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'تقنية',
    tags: '' as any as string,
    isFeatured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const payload = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || formData.content.slice(0, 160),
      featuredImage: formData.featuredImage,
      category: formData.category as any,
      tags: (formData.tags || '').split(',').map(t => t.trim()).filter(Boolean),
      isFeatured: !!formData.isFeatured,
      readingTime: Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200)),
      slug: formData.title.toLowerCase().replace(/[^\u0621-\u064Aa-z0-9\s-]/g,'').trim().replace(/\s+/g,'-')

    if (editingArticle) {
      await updateArticle(editingArticle.id, payload as Partial<Article>);
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
  };

  const startEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData({
      title: art.title,
      content: art.content,
      excerpt: art.excerpt,
      featuredImage: art.featuredImage,
      category: art.category as any,
      tags: (art.tags || []).join(', '),
      isFeatured: art.isFeatured
    });
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <button
          onClick={() => setShowForm(s => !s)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white"
        >
          <Plus size={18}/> مقال جديد
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input className="w-full border p-3 rounded" placeholder="العنوان"
                 value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})}/>
          <textarea className="w-full border p-3 rounded min-h-[180px]" placeholder="المحتوى"
                 value={formData.content} onChange={e=>setFormData({...formData,content:e.target.value})}/>
          <input className="w-full border p-3 rounded" placeholder="مقتطف (اختياري)"
                 value={formData.excerpt} onChange={e=>setFormData({...formData,excerpt:e.target.value})}/>
          <input className="w-full border p-3 rounded" placeholder="رابط صورة مميزة (اختياري)"
                 value={formData.featuredImage} onChange={e=>setFormData({...formData,featuredImage:e.target.value})}/>
          <input className="w-full border p-3 rounded" placeholder="تصنيفات (تقنية/صحة/رياضة..)"
                 value={formData.category} onChange={e=>setFormData({...formData,category:e.target.value})}/>
          <input className="w-full border p-3 rounded" placeholder="وسوم مفصولة بفواصل ,"
                 value={formData.tags} onChange={e=>setFormData({...formData,tags:e.target.value})}/>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={formData.isFeatured}
                   onChange={e=>setFormData({...formData,isFeatured:e.target.checked})}/>
            اجعله مميز
          </label>
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">
            <Save size={16} className="inline mr-2"/> حفظ
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {articles.map((a) => (
          <div key={a.id} className="p-4 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{a.title}</div>
                <div className="text-sm opacity-70">{a.slug}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>startEdit(a)} className="px-3 py-1 border rounded"><Edit3 size={16}/></button>
                <button onClick={()=>deleteArticle(a.id)} className="px-3 py-1 border rounded"><Trash2 size={16}/></button>
                <button onClick={()=>setFeaturedArticle(a.id)} className="px-3 py-1 border rounded"><Star size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

