import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from './axios';
import apiCall from './apiCall';
import { AsyncThunkConfig, CreateOrderPayload, GetOrderPayload } from '@/types/api';
import { CreateOrderResponse, GetOrderResponse } from '@/types/apiResponse';


export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderPayload,
  AsyncThunkConfig
>('/api/create-order', async (formData, thunkAPI) => {
  const Axios = await AxiosBase();
  console.log('pay', formData);
  return apiCall(
    Axios.post('/api/create-order', formData), thunkAPI);
});

export const getOrder = createAsyncThunk<
  GetOrderResponse,
  GetOrderPayload,
  AsyncThunkConfig
>('/api/get-order', async (_, thunkAPI) => {
  const Axios = await AxiosBase();
  return apiCall(
    Axios.get('/api/orders'), thunkAPI);
});
