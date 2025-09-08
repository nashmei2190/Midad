import { useEffect, useState } from "react";
import { getTodayVisitors } from "../services/analyticsReport";

export default function Dashboard() {
  const [visitors, setVisitors] = useState("...");

  useEffect(() => {
    getTodayVisitors().then(setVisitors);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>لوحة التحكم</h1>
      <h2>👥 عدد زوار اليوم: {visitors}</h2>
    </div>
  );
}
