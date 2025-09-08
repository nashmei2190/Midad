import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: any;
}

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (slug) {
        const ref = doc(db, "articles", slug);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setArticle({ id: snap.id, ...snap.data() } as Article);
        }
      }
    }
    fetchArticle();
  }, [slug]);

  if (!article) return <p>جاري التحميل...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} style={{ maxWidth: "400px" }} />}
      <p>{article.content}</p>
    </div>
  );
};

export default PostPage;
