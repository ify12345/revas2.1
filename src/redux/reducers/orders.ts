import { getOrder } from "@/api/order";
import { createSlice } from "@reduxjs/toolkit";

interface Order {
  id: string;
  companyName: string;
  email: string;
  location: string;
  product: string;
  capacity: number;
  pricePerTonne: number;
  supplier: string;
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
}

const initialState: State = {
  order: null
};

export const order = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, {payload}) => {
      state.order = payload;
      console.log("order:", payload);
    });
  },
});

export default order.reducer;