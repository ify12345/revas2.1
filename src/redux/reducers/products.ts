import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductState } from '@/types/product';
import { searchBuyerProduct, searchSupplierProduct } from '@/api/products';

const initialState: ProductState = {
  products: [],
  sellerProducts: [],
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
      .addCase(searchBuyerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBuyerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(searchBuyerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
    builder
      .addCase(searchSupplierProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchSupplierProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProducts = action.payload.products;
      })
      .addCase(searchSupplierProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { selectProduct, clearSelectedProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;