import { api } from "../lib/axios";

export interface Customer {
  id: string;
  name: string;
}

export async function getCustomers(company_id: string) {
  const response = await api.get("/customers/list-customers", {
    params: { company_id },
  });

  return response.data.customers
}