import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: any;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const list: Article[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      setArticles(list);
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>الصفحة الرئيسية</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2><Link to={`/post/${article.id}`}>{article.title}</Link></h2>
          {article.image && <img src={article.image} alt={article.title} style={{ maxWidth: "200px" }} />}
          <p>{article.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
