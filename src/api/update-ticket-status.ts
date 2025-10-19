import { api } from "../lib/axios";

export interface UpdateTicketBody {
  id: number;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}

export async function updateTicketStatus({ status, id }: UpdateTicketBody) {
  await api.put(`/tickets/update/status/${id}`, {
    status: status,
  });
}
