import { useEffect } from "react";

function sendHomeView() {
  const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;
  const API_SECRET = import.meta.env.VITE_API_SECRET;

  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: String(Date.now()),
      events: [
        {
          name: "page_view",
          params: {
            page_title: "الرئيسية",
            page_location: window.location.href,
            page_path: "/",
          },
        },
      ],
    }),
  });
}

export default function Home() {
  useEffect(() => {
    sendHomeView();
  }, []);

  return (
    <div>
      <h1>مرحباً بك في مداد ✨</h1>
    </div>
  );
}
