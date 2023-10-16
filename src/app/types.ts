export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    inventory_id: number;
  }
  
  export interface createProductPayload {
    name: string;
    price: number;
    quantity: number;
    inventory_id: number;
  }
  
  export interface updateProductPayload {
    id: number;
    name: string;
    price: number;
    quantity: number;
    inventory_id: number;
  }
  
  export interface deleteProductPayload {
    id: number;
  }
  
  export interface ProductsState {
    data: Product[];
    loading: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | null;
  }
  
  export const initialState: ProductsState = {
    data: [],
    loading: "idle",
    error: null,
  };
  