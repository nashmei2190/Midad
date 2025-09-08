import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Article } from '../types/Article';

interface ArticlesContextType {
  articles: Article[];
  featuredArticle: Article | null;
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  setFeaturedArticle: (id: string) => void;
  getArticleBySlug: (slug: string) => Article | undefined;
  incrementViews: (id: string) => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('midad-articles');
    if (saved) {
      const parsedArticles = JSON.parse(saved).map((article: any) => ({
        ...article,
        publishedAt: new Date(article.publishedAt)
      }));
      setArticles(parsedArticles);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('midad-articles', JSON.stringify(articles));
  }, [articles]);

  const addArticle = (articleData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date(),
      views: 0,
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...updates } : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const setFeaturedArticle = (id: string) => {
    setArticles(prev => prev.map(article => ({
      ...article,
      isFeatured: article.id === id
    })));
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find(article => article.slug === slug);
  };

  const incrementViews = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, views: article.views + 1 } : article
    ));
  };

  const featuredArticle = articles.find(article => article.isFeatured) || null;

  return (
    <ArticlesContext.Provider value={{
      articles,
      featuredArticle,
      addArticle,
      updateArticle,
      deleteArticle,
      setFeaturedArticle,
      getArticleBySlug,
      incrementViews,
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