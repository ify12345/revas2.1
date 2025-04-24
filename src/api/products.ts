import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from './axios';
import apiCall from './apiCall';
import { AsyncThunkConfig, GetProductsPayload, RegisterProductPayload } from '@/types/api';
import { GetProductsResponse, RegisterProductResponse } from '@/types/apiResponse';
import { searchProductsPayload, searchProductsResponse } from '@/types/product';


export const registerProduct = createAsyncThunk<
  RegisterProductResponse,
  RegisterProductPayload,
  AsyncThunkConfig
>('register/product', async (formData, thunkAPI) => {
  const Axios = await AxiosBase();
  console.log('pay', formData);

  return apiCall(
    Axios.post('/register-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    thunkAPI
  );
});

export const getProducts = createAsyncThunk<
  GetProductsResponse,
  GetProductsPayload,
  AsyncThunkConfig
>('/api/get-products', async (_, thunkAPI) => {
  const Axios = await AxiosBase();
  return apiCall(
    Axios.get('/products/all'), thunkAPI);
    
});

export const searchProduct = createAsyncThunk<
  searchProductsResponse,
  searchProductsPayload,
  AsyncThunkConfig
>('/api/search-products', async (payload, thunkAPI) => {
  const Axios = await AxiosBase();
  console.log(payload.companyName)
  return apiCall(
    Axios.get(`/products?companyName=${payload.companyName}`), 
    thunkAPI
  );
});