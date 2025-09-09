
// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Posts"), (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!title || !content) return;
    await addDoc(collection(db, "Posts"), {
      title,
      content,
      createdAt: new Date().toLocaleString()
    });
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "Posts", id));
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
