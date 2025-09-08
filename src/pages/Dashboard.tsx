import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: any;
}

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  async function fetchArticles() {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const list: Article[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
    setArticles(list);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async () => {
    if (!title || !content) return;
    await addDoc(collection(db, "articles"), {
      title,
      content,
      image: image || null,
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setContent("");
    setImage("");
    fetchArticles();
  };

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(db, "articles", id));
    fetchArticles();
  };

  return (
    <div>
      <h1>لوحة التحكم</h1>
      <div>
        <input
          type="text"
          placeholder="عنوان المقال"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="المحتوى"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="رابط الصورة (اختياري)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={addArticle}>إضافة مقال</button>
      </div>

      <h2>جميع المقالات</h2>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <button onClick={() => deleteArticle(article.id)}>حذف</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
