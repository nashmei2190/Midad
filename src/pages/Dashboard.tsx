import { useEffect, useState } from "react";

export default function Dashboard() {
  const [todayVisitors, setTodayVisitors] = useState("...");
  const [totalVisitors, setTotalVisitors] = useState("...");

  async function fetchVisitors() {
    const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;
    const API_SECRET = import.meta.env.VITE_API_SECRET;

    // اليوم
    const todayRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/12130850783:runReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      }),
    });
    const todayData = await todayRes.json();
    setTodayVisitors(todayData.rows?.[0]?.metricValues?.[0]?.value || "0");

    // الإجمالي
    const totalRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/12130850783:runReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      }),
    });
    const totalData = await totalRes.json();
    setTotalVisitors(totalData.rows?.[0]?.metricValues?.[0]?.value || "0");
  }

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>لوحة التحكم</h1>
      <h2>👥 زوار اليوم: {todayVisitors}</h2>
      <h2>🌍 إجمالي الزوار: {totalVisitors}</h2>
    </div>
  );
}
