
// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Posts"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h1>آخر المقالات</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <p>{post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
