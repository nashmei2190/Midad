// src/hooks/useArticles.tsx
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Article } from '../types/Article';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  increment,
  serverTimestamp
} from 'firebase/firestore';

interface ArticlesContextType {
  articles: Article[];
  featuredArticle: Article | null;
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  setFeaturedArticle: (id: string) => Promise<void>;
  getArticleBySlug: (slug: string) => Article | undefined;
  incrementViews: (id: string) => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^ء-يa-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeatured] = useState<Article | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'Posts'), orderBy('publishedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr: Article[] = snap.docs.map((d) => {
        const data: any = d.data();
        return {
          id: d.id,
          title: data.title ?? '',
          content: data.content ?? '',
          excerpt: data.excerpt ?? '',
          featuredImage: data.featuredImage ?? '',
          category: data.category ?? 'تقنية',
          tags: data.tags ?? [],
          author: data.author ?? 'Admin',
          publishedAt: (data.publishedAt && data.publishedAt.toDate)
            ? data.publishedAt.toDate()
            : (data.publishedAt ? new Date(data.publishedAt) : new Date()),
          isFeatured: !!data.isFeatured,
          views: data.views ?? 0,
          readingTime: data.readingTime ?? Math.max(1, Math.ceil((data.content ?? '').split(/\s+/).length / 200)),
          slug: data.slug ?? slugify(data.title ?? '')
        } as Article;
      });
      setArticles(arr);
      const f = arr.find(a => a.isFeatured) || arr[0] || null;
      setFeatured(f);
    });
    return () => unsub();
  }, []);

  const addArticle = async (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    const newDoc = {
      ...article,
      slug: article.slug || slugify(article.title),
      views: 0,
      publishedAt: serverTimestamp()
    };
    await addDoc(collection(db, 'Posts'), newDoc);
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    const ref = doc(db, 'Posts', id);
    await updateDoc(ref, {
      ...updates,
      slug: updates.slug || (updates.title ? slugify(updates.title) : undefined)
    } as any);
  };

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(db, 'Posts', id));
  };

  const setFeaturedArticle = async (id: string) => {
    setFeatured(articles.find(a => a.id === id) || null);
    await updateDoc(doc(db, 'Posts', id), { isFeatured: true } as any);
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find(a => a.slug === slug);
  };

  const incrementViews = async (id: string) => {
    try {
      await updateDoc(doc(db, 'Posts', id), { views: increment(1) } as any);
    } catch {}
  };

  return (
    <ArticlesContext.Provider value={{
      articles,
      featuredArticle,
      addArticle,
      updateArticle,
      deleteArticle,
      setFeaturedArticle,
      getArticleBySlug,
      incrementViews
    }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};
