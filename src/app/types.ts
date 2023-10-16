// foodItemsSlice.ts

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inventory_id: number;
}

export interface createFoodItemPayload {
  name: string;
  price: number;
  quantity: number;
  inventory_id: number;
}

export interface updateFoodItemPayload {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inventory_id: number;
}

export interface deleteFoodItemPayload {
  id: number;
}

export interface FoodItemsState {
  data: FoodItem[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

export const initialState: FoodItemsState = {
  data: [],
  loading: "idle",
  error: null,
};
