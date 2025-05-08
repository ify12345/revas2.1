import { getDocuments, getDrafts, getOrder } from "@/api/order";
import { createSlice } from "@reduxjs/toolkit";

interface Order {
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
  savedOrder: Order[] | null;
  getDocs: Document[];
}

const initialState: State = {
  order: null,
  savedOrder: null,
  getDocs: []
};

export const order = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, {payload}) => {
      state.order = payload?.data || [];
      console.log("order:", payload.data);
    });
    builder.addCase(getDrafts.fulfilled, (state, {payload}) => {
      state.savedOrder = Array.isArray(payload?.data) ? payload.data : [];
      // console.log("savedorder:", payload);
    });
    builder.addCase(getDocuments.fulfilled, (state, {payload}) => {
      state.getDocs = payload
      console.log("getDocs:", payload);
    });
  },
});

export default order.reducer;