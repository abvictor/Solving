import { api } from "../lib/axios";

export interface Product {
  id: string;
  name: string;
}

export async function getUserProducts(product_id: string) {
  const response = await api.get(`/users/list-user-products`, {
    params: { product_id },
  });

  return response.data as Product[];
}
