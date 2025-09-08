import React, { useEffect, useState } from "react";
import { getRealtimeVisitors } from "../services/analytics";

const Home: React.FC = () => {
  const [visitors, setVisitors] = useState("0");

  useEffect(() => {
    async function fetchData() {
      const v = await getRealtimeVisitors();
      setVisitors(v);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>الصفحة الرئيسية</h1>
      <p>عدد الزوار الآن: {visitors}</p>
    </div>
  );
};

export default Home;
