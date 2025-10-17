import { api } from "../lib/axios";

export interface RegisterTicketBody {
  title: string;
  description: string;
  priority: string;
  product_id: string;
  customer_id: string
  module_id: string;
  category?: string;
}

export async function registerTicket({
  title,
  description,
  priority,
  product_id,
  module_id,
  customer_id,
}: RegisterTicketBody) {
  await api.post("/tickets/create-ticket", {
    title,
    description,
    priority,
    product_id,
    module_id,
    customer_id,
    category: "",
  });
}

