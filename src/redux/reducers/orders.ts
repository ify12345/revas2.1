import { generateOrder, getDocuments, getDrafts, getOrder } from "@/api/order";
import { createSlice } from "@reduxjs/toolkit";

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
}
interface GenerateOrderResponse {
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
interface Document {
  id: string;
  orderId: string;
  type: string;
  fileUrl: string;
  status: string;
  orderStatus: string;
  generatedAt: string;
  requiresSignature: boolean;
  downloadUrl: string;
}

export type getDocsResponse = Document[];

interface State {
  order: Order | Order[] | null;
  savedOrder: Order[] ;
  getDocs: Document[];
  generateOrder: GenerateOrderResponse | null;
}

const initialState: State = {
  order: null,
  savedOrder: [],
  getDocs: [],
  generateOrder: null
};

export const order = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, {payload}) => {
      state.order = payload?.data || [];
      // console.log("order:", payload.data);
    });
    builder.addCase(getDrafts.fulfilled, (state, {payload}) => {
      state.savedOrder = payload || [];
      // console.log("savedorder:", payload);
    });
    builder.addCase(getDocuments.fulfilled, (state, {payload}) => {
      state.getDocs = payload
      console.log("getDocs:", payload);
    });
    builder.addCase(generateOrder.fulfilled, (state, {payload}) => {
      state.generateOrder = payload
      console.log("getDocs:", payload);
    });
  },
});

export default order.reducer;