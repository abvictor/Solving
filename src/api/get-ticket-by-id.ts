import { api } from "../lib/axios";

export interface GetTicketById {
  id: number;
}

export async function getTicketById({ id }: GetTicketById) {
  const response = await api.get(`/tickets/${id}`);
  return response.data.ticket
}
