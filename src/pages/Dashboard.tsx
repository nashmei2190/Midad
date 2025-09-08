
// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async () => {
    if (!title || !content) return;
    await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: new Date().toLocaleString()
    });
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>لوحة التحكم</h1>
      <input
        type="text"
        placeholder="العنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="المقال"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAdd}>إضافة مقال</button>

      <h2>المقالات الحالية</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <button onClick={() => handleDelete(post.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
