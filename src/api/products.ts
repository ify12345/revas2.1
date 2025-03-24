import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from './axios';
import apiCall from './apiCall';
import { AsyncThunkConfig, RegisterProductPayload } from '@/types/api';
import { RegisterProductResponse } from '@/types/apiResponse';


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
