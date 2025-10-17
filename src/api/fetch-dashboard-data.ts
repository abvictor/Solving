import { api } from "../lib/axios";


export async function fetchDashboardData() {
  const response = await api.get("/dashboard");

  return response.data.dashboard;
}