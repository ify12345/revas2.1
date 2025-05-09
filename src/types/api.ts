/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AppDispatch } from '@/redux/store'


export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown
  /** type for `thunkApi.dispatch` */
  dispatch?: AppDispatch
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: RejectValue
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}

export interface RejectValue {
  msg: string
  status: number
}

export enum Status {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  failed = 'failed',
}

export interface RegisterPayload {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  role?: string;
  clientType?: string
}

export interface LoginPayload {
  email: string
  password: string
}
export interface forgotPasswordPayload {
  password?: string
  confirmPassword?: string
  pin?: string
  email?: string
}
export interface ErrorResponse {
  msg: string
  status: number
}

export interface RegisterProductPayload {
  companyName?: string
  product?:  string[]
  capacity?: number
  price?: number
  location?: string
  image?: string | File
  id?:string
}
export interface GetProductsPayload {
  companyName?: string
  product?: string
  capacity?: number
  price?: number
  location?: string
  image?: string | File
}

export interface CreateOrderPayload {
  companyName?: string
  email?: string | undefined;
  buyerLocation: string
  supplierLocation: string
  product: string
  capacity: number
  pricePerTonne: number
  supplierName: string
  supplierPrice: number
  shippingCost: number
  shippingType: string; 
  negotiatePrice: boolean
  priceRange: number
  savedStatus: string;
  buyerName: string;
  buyerId?: string;
  paymentTerms?: number;
  supplierId?: string;
 
}

export interface EditOrderPayload {
   id?: string | number;
   companyName?: string
  email?: string
  location?: string
  product?: string
  capacity?: number
  pricePerTonne?: number
  supplier?: string
  supplierPrice?: number
  shippingCost?: number
  shippingType?: string // Added the missing field
  negotiatePrice?: boolean
  priceRange?: number
  savedStatus?: string;
  status?:string

}
export interface GetOrderPayload {
  

}
export interface Document {
  id: string
  orderId: string
  type: string
  fileUrl: string
  status: string
  orderStatus: string
  generatedAt: string
  requiresSignature: boolean
  downloadUrl: string
}
export interface generateOrderPayload {
  id: string
}
export interface Notification {
  id: string
  type: string
  message: string
  isRead: boolean
  title: string
  body: string
  read: boolean
  createdAt: string
  userId?: string
  orderId?:string;
  metadata?: Record<string, any>
}

export interface NotificationType {
  id: string
  title: string
  body: string
  read: boolean
  createdAt: string
  userId?: string
  orderId?:string;
  type?: 'info' | 'warning' | 'error' | 'success'
  metadata?: Record<string, any>
}

export interface GetNotificationsPayload {
  userId: string
  isRead?: boolean
  type?: string
  page?: number
  limit?: number
}

export interface NotificationResponse {
  data: Notification[]
  total: number
  page: number
  limit: number,
  currentPage: number;
  totalPages: number;
}