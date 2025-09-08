
// src/pages/PostPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };
    fetchPost();
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
