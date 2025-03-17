/* eslint-disable @typescript-eslint/no-unused-vars */

import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosBase from "./axios";
import { AsyncThunkConfig, LoginPayload, RegisterPayload, RejectValue } from "@/types/api";
import { ApiError, ErrorPayload, LoginResponse, RegisterResponse } from "@/types/apiResponse";


export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload.values);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/register', payload.values);

      console.log('data', data);

      return data; // Successful registration response
    } catch (err) {
      const error = err as ErrorPayload;
      console.log('new error', error.response?.data);

      // Handle network errors
      if (!error.response) {
        return thunkAPI.rejectWithValue({ msg: 'Network Error', status: 500 });
      }

      // Handle API errors
      const responseData = error.response.data;
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
    }
  }
);


export const login = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>(
  "auth/sign-in",
  async (payload, thunkAPI) => {
    try {
    
      const Axios = await AxiosBase();
     
  
      const { data } = await Axios.post('/login', payload);

      console.log('data', data);
      if (data.token) {
        console.log('iso', data.token); // Save token securely
      }
      return data; 
    } catch (err) {
      const error = err as ErrorPayload;
      console.log('new error', error.response?.data);

      // Handle network errors
      if (!error.response) {
        return thunkAPI.rejectWithValue({ msg: 'Network Error', status: 500 });
      }

      // Handle API errors
      const responseData = error.response.data;
      const errorMsg = responseData?.error || responseData?.message || 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      });
    }
  }
);

export const getProfile = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>(
  "get/profile",
  async (_, thunkAPI) => {
    try {
    
      const Axios = await AxiosBase();
      const { data } = await Axios.get('/student-info');

      console.log('data', data);

      return data; 
    } catch (err) {
      const error = err as ErrorPayload;
      console.log('new error', error.response?.data);

      // Handle network errors
      if (!error.response) {
        return thunkAPI.rejectWithValue({ msg: 'Network Error', status: 500 });
      }

      // Handle API errors
      const responseData = error.response.data;
      const errorMsg = responseData?.error || responseData?.message || 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      });
    }
  }
);

export const UpdateProfile = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>(
  "update/profile",
  async (payload, thunkAPI) => {
    try {
    
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/student-info',payload);

      console.log('data', data);

      return data; 
    } catch (err) {
      const error = err as ErrorPayload;
      console.log('new error', error.response?.data);

      // Handle network errors
      if (!error.response) {
        return thunkAPI.rejectWithValue({ msg: 'Network Error', status: 500 });
      }

      // Handle API errors
      const responseData = error.response.data;
      const errorMsg = responseData?.error || responseData?.message || 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      });
    }
  }
);

