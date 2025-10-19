import { api } from "../lib/axios";


export interface UpdateTicketBody {
  id: number;
  title: string;
  description: string;
  priority: "HIGH" | "LOW" | "URGENT";
  product_id: string;
  customer_id: string;
  module_id: string;
}

export async function updateTicketData({
  id,
  title,
  description,
  priority,
  product_id,
  customer_id,
  module_id,
}: UpdateTicketBody) {
  const data = {
    title,
    description,
    priority,
    product_id,
    customer_id,
    module_id,
  };
  await api.put(`/tickets/update/${id}`, data);
}