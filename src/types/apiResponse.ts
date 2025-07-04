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
    buyer?:{
      firstName?: string
      lastName?: string
      email?: string
    }
    supplier?:{
      firstName?: string
      lastName?: string
      email?: string
    }
    buyerAccountManager?:{
      firstName?: string
      lastName?: string
      email?: string
    }
    supplierAccountManager?:{
      firstName?: string
      lastName?: string
      email?: string
    }
    buyerName?:string;
    sellerName?:string;
    supplierLocation?:string;
    buyerLocation?:string;
    message?: string;
    success?: boolean;
    data?:[];
    documents?: {
      id: string;
      fileUrl: string;
      type: string;
      status: string;
      generatedAt: string;
    }[];
  }
export interface RegisterProductResponse {
  success: boolean;
  message: string;
}
export interface GetProductsResponse {
  success: boolean;
  message: string;
}
export interface approveResponse {
  success: boolean;
  message: string;
}

export interface PendingUser {
  id: string
  firstName: string
  lastName: string
  email: string
  isInvitedUser: boolean
  role: string
  clientType: string
  whatsappNumber: string | null
  resetToken: string | null
  resetTokenExpiry: string | null
  resetCode: string | null
  resetCodeExpiry: string | null
  hasRegisteredProduct: boolean
  passwordChangedAt: string | null
  lastLogin: string | null
  status: string
  rejectionReason: string | null
  approvedAt: string | null
  approvedById: string | null
  invitedBy: string | null
  invitedUserId: string | null
  createdAt: string
  updatedAt: string
}

export interface deleteOrderResponse {
  success: boolean;
  message: string;
}
export interface generateOrderResponse { 
  message: string;
  document?: {
    id: string;
    url: string;
    type: string;
    status: string;
    generatedAt: string;
  };
  data?: {
    docUrl: string;
  };
  isExisting?: boolean;
}

export interface signDocumentResponse {
  signedAs: string;
  success?: boolean;
  message?: string;
  data?: {
    docUrl: string;
  };
  signedPdfUrl?: string;
  signatureImageUrl?: string;
  documentId?: string;
  status?: string;
  };
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

