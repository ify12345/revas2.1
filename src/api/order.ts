import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from './axios';
import apiCall from './apiCall';
import { AsyncThunkConfig, CreateOrderPayload } from '@/types/api';
import { CreateOrderResponse } from '@/types/apiResponse';


export const registerProduct = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderPayload,
  AsyncThunkConfig
>('/api/create-order', async (formData, thunkAPI) => {
  const Axios = await AxiosBase();
  console.log('pay', formData);

  return apiCall(
    Axios.post('/api/create-order', formData), thunkAPI);
});
