import { api } from "../lib/axios";


export async function getTickets() {
  const response = await api.get("/tickets/list-all");

  return response.data.tickets;
}