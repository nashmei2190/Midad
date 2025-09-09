import { google } from "googleapis";
import path from "path";
import fs from "fs";

const KEYFILE_PATH = path.join(process.cwd(), "unified-surface-471213-h2-d872fc7cb55d.json");
const PROPERTY_ID = "12130850783";

const keyFile = JSON.parse(fs.readFileSync(KEYFILE_PATH, "utf-8"));

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: keyFile.client_email,
    private_key: keyFile.private_key,
  },
  scopes: SCOPES,
});

const analyticsDataClient = google.analyticsdata({
  version: "v1beta",
  auth,
});

export async function getRealtimeVisitors() {
  const res = await analyticsDataClient.properties.runRealtimeReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: { metrics: [{ name: "activeUsers" }] },
  });
  return res.data.rows?.[0]?.metricValues?.[0]?.value || "0";
}

  const res = await analyticsDataClient.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dimensions: [{ name: "pagePath" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: { value: `/post/${slug}` },
        },
      },
    },
  });
  return res.data.rows?.[0]?.metricValues?.[0]?.value || "0";
}

export async function getSiteStats() {
  const res = await analyticsDataClient.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    },
  });
  return res.data.rows?.[0]?.metricValues?.[0]?.value || "0";
}
