import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostViews } from "../services/analytics";

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [views, setViews] = useState("0");

  useEffect(() => {
    async function fetchData() {
      if (slug) {
        const v = await getPostViews(slug);
        setViews(v);
      }
    }
    fetchData();
  }, [slug]);

  return (
    <div>
      <h1>المقال: {slug}</h1>
      <p>عدد المشاهدات: {views}</p>
    </div>
  );
};

export default PostPage;
