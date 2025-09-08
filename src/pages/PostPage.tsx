import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const { getArticleBySlug, incrementViews } = useArticles();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) incrementViews(article.id);
  }, [article]);

  if (!article) {
    return <div className="container mx-auto px-4 py-10">المقال غير موجود</div>;
  }

  return (
    <article className="container mx-auto px-4 py-10 prose prose-lg max-w-3xl">
      <h1>{article.title}</h1>
      {article.featuredImage && (
        <img src={article.featuredImage} alt={article.title} className="w-full rounded" />
      )}
      <div className="text-sm opacity-70 mb-4">
        نُشِر في {new Date(article.publishedAt).toLocaleString('ar-SA')}
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
};

export default PostPage;
