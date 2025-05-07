import { getDrafts, getOrder } from "@/api/order";
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

interface State {
  order: Order | Order[] | null;
  savedOrder: Order[] | null;
}

const initialState: State = {
  order: null,
  savedOrder: null
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
      state.savedOrder = Array.isArray(payload?.data) ? payload.data : [];
      // console.log("savedorder:", payload);
    });
  },
});

export default order.reducer;