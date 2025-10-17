import { api } from "../lib/axios";

export interface Module {
  id: string;
  name: string;
  description: string;
  product_id: string;
}

export async function getProductModules(product_id: string) {
  const response = await api.get(`/product/list-modules`, {
    params: { product_id },
  });

  return response.data.modulos as Module[];
}
