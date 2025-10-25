import { api } from "../lib/axios";

interface GetTicketsProps {
  page: number;
  take: number;
  ticket_id: number;
  customer_name: string;
}

export async function getTickets({
  page = 1,
  take = 10,
  ticket_id,
  customer_name,
}: GetTicketsProps) {
  const response = await api.get("/tickets/list-all", {
    params: { page, take, ticket_id: ticket_id, customer_name: customer_name },
  });
  
  return response.data;
}