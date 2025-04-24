import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductState } from '@/types/product';
import { searchProduct } from '@/api/products';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { selectProduct, clearSelectedProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;