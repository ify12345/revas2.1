export interface Product {
    id: string;
    companyName: string;
    product: string[];
    capacity: number;
    price: number;
    location: string;
    imageUrl: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface searchProductsPayload {
    companyName: string;
  }
  
  export interface searchProductsResponse {
    products: Product[];
  }
  
  export interface ProductState {
    products: Product[];
    sellerProducts: Product[];
    loading: boolean;
    error: string | null;
    selectedProduct: Product | null;
  }

  export type StatusType = 'matched' | 'not_matched' | 'pending';