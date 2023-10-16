// api.ts

import axios, { AxiosResponse } from "axios";
import {
  Product,
  createProductPayload,
  updateProductPayload,
  deleteProductPayload,
} from "./types";

const baseURL = "http://localhost:8000/api"; // Replace with your actual API base URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define your API functions for specific endpoints

// Example: Fetch products
export const fetchProducts = async (): Promise<AxiosResponse<Product[]>> => {
  const url = "/product"; // Adjust the endpoint as needed
  return (await api.get(url)).data;
};

// Example: Add a new product
export const addProduct = async (
  newProduct: createProductPayload
): Promise<AxiosResponse<Product>> => {
  const url = "/product"; // Adjust the endpoint as needed
  return api.post(url, newProduct);
};

// Example: Update a product
export const updateProduct = async (
  product: updateProductPayload
): Promise<AxiosResponse<Product>> => {
  const url = `/product/${product.id}`; // Adjust the endpoint as needed
  return api.put(url, product);
};

// Example: Delete a product
export const deleteProduct = async (
  productId: deleteProductPayload
): Promise<AxiosResponse<void>> => {
  const url = `/product/${productId.id}`; // Adjust the endpoint as needed
  return api.delete(url);
};

export default api;
