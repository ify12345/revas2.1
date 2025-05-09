/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Profile {
  id: number;
  jobTitle: null | string;
  businessName: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  streetAddress1: string;
  streetAddress2: null | string;
  city: string;
  countryId: number;
  zipCode: string;
  hasVerifiedEmail: boolean;
  profilePhotoUrl: string;
  state: null | string;
  country: {
    countryName: string;
    countryId: number;
    countryCode: string;
    countryDialCode: string;
  };
  doesHomeService: boolean;
  roles: string;
}

export type Role =  'buyer' | 'seller'

export interface RegisterResponse {
  success: boolean;
  message: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: Role
  is_active: boolean;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
  token?: string
}
  export interface Order {
    id: string;
    companyName: string;
    email: string;
    location: string;
    product: string;
    capacity: number;
    pricePerTonne: number;
    supplierName: string;
    supplierPrice: number;
    shippingCost: number;
    negotiatePrice: boolean;
    priceRange: number;
    savedStatus: string;
    status: string;
    docUrl: string | null;
    buyerId: string | null;
    supplierId: string | null;
    accountManagerId: string | null;
    userId: string;
    createdAt: string; 
    updatedAt: string; 
    message?: string
    success?: boolean;
    data?:[]
  }
export interface RegisterProductResponse {
  success: boolean;
  message: string;
}
export interface GetProductsResponse {
  success: boolean;
  message: string;
}

export interface deleteOrderResponse {
  success: boolean;
  message: string;
}
export interface generateOrderResponse { 
  data?:{
    docUrl: string
    message: string;
  }
  message?: string
}

 export interface CreateOrderResponse {
  orders?: Order[]; 
  message?:string;
  success?: boolean;
  msg?:string
}

export interface GetOrderResponse {
  success: boolean;
  count: number;
  data: Order[];
}

export interface GetDraftResponse {
  success?: boolean;
  count?: number;
  
}

export interface ApiError {
  msg: string;
  status: number;
}

export interface ErrorPayload {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status: number;
  };
}


export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  email: string;
  phone_number: string;
  user_id: string;
  email_verified: boolean;
  phone_verified: boolean;
  profile: object;
  user: {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
    hasRegisteredProduct: boolean;
  };
}

export interface forgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface GetOverviewResponse {
  success: boolean;
  message: string;
  data: {
    overview: {
      totalEarning: number;
      totalBooked: number;
    };
  };
}

