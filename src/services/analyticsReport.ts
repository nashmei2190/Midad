// خدمات Google Analytics API (Frontend بديل مبسط)
export async function getVisitors(startDate: string, endDate: string) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/12130850783:runReport`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: "activeUsers" }],
    }),
  });
  const data = await response.json();
  return data.rows?.[0]?.metricValues?.[0]?.value || "0";
}
