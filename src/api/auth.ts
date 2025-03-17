/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, LoginPayload, RegisterPayload } from "@/src/types/api";
import { LoginResponse, RegisterResponse } from "@/src/types/apiResponse";
import AxiosBase from "./axios";
import apiCall from "./apiCall";
import apiRequest from "./request copy";
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';


interface ErrorPayload {
  response?: {
    data?: { error?: string };
    status: number;
  };
}


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
      const errorMsg = responseData?.error || responseData?.message || 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      });
    }
  }
);


export const login = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>(
  "auth/sign-in",
  async (payload, thunkAPI) => {
    try {
    
      const Axios = await AxiosBase();
      const deviceName = Device.modelName || 'Unknown Device';
      const fullPayload = { ...payload.values, device_name: deviceName };
      console.log('pay', fullPayload);
      const { data } = await Axios.post('/login', fullPayload);

      console.log('data', data);
      if (data.token) {
        await SecureStore.setItemAsync('iso', data.token); // Save token securely
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
export const getServices = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>(
  "get/service",
  async (_, thunkAPI) => {
    try {
    
      const Axios = await AxiosBase();
      const { data } = await Axios.get('/services');

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
