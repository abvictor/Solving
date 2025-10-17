import { api } from "../lib/axios";

export interface UpdateTicketBody {
    status: string;
    id: number
}

export async function updateTicketStatus({ status, id }: UpdateTicketBody) {
  await api.put(
    "/tickets/update/status",
    {
      status: status,
    },
    { params: { ticket_id: id } }
  );
}
