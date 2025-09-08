import React, { useEffect, useState } from "react";
import { getSiteStats, getRealtimeVisitors } from "../services/analytics";

const Dashboard: React.FC = () => {
  const [siteStats, setSiteStats] = useState("0");
  const [realtime, setRealtime] = useState("0");

  useEffect(() => {
    async function fetchData() {
      const stats = await getSiteStats();
      const real = await getRealtimeVisitors();
      setSiteStats(stats);
      setRealtime(real);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>لوحة التحكم</h1>
      <p>عدد الزيارات آخر 30 يوم: {siteStats}</p>
      <p>عدد الزوار الآن: {realtime}</p>
    </div>
  );
};

export default Dashboard;
