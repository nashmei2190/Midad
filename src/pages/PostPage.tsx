
// src/pages/PostPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, "Posts", id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (!post) return <p>جاري التحميل...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>{post.createdAt}</small>
    </div>
  );
}
