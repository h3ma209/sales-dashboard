// api.ts

import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { FoodItem, createFoodItemPayload } from "./types";

const baseURL = "http://localhost:8000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFoodItems = async (): Promise<AxiosResponse<FoodItem[]>> => {
  const url = "/food-items";
  return api.get(url);
};

export const addFoodItem = async (
  newFoodItem: createFoodItemPayload
): Promise<AxiosResponse<createFoodItemPayload>> => {
  const url = "/food-items";
  return api.post(url, newFoodItem);
};

export const updateFoodItem = async (
  foodItem: FoodItem
): Promise<AxiosResponse<FoodItem>> => {
  const url = `/food-items/${foodItem.id}`;
  return api.put(url, foodItem);
};

export const deleteFoodItem = async (
  foodItemId: number
): Promise<AxiosResponse<void>> => {
  const url = `/food-items/${foodItemId}`;
  return api.delete(url);
};

export default api;
