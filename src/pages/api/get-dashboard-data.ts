import { NextApiRequest, NextApiResponse } from 'next';
import dashboardData from '../../core/dictionary/dashboard-data';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!dashboardData) {
      throw new Error("Dashboard data is not available");
    }
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
