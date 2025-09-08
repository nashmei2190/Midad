import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: "config/credentials.json",
});

const PROPERTY_ID = "12130850783";

export async function getTodayVisitors() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: "today", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  return response.rows?.[0]?.metricValues?.[0]?.value || "0";
}
