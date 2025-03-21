/* eslint-disable @typescript-eslint/no-unused-vars */

import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosBase from "./axios";
import { AsyncThunkConfig, forgotPasswordPayload, LoginPayload, RegisterPayload, RejectValue } from "@/types/api";
import { ApiError, ErrorPayload, forgotPasswordResponse, LoginResponse, RegisterResponse } from "@/types/apiResponse";


export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>(
  'account-managers/register',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/account-managers/register', payload);

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
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
    }
  }
);

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>(
  '/user/register',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/api/register', payload);
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
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
    }
  }
);

export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  AsyncThunkConfig
>(
  'account-managers/login',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/account-managers/login', payload);

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
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
    }
  }
);

export const UserLogin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  AsyncThunkConfig
>(
  '/users/login',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/login', payload);

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
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
    }
  }
);

export const forgotPassword = createAsyncThunk<
  forgotPasswordResponse,
  forgotPasswordPayload,
  AsyncThunkConfig
>(
  '/users/login',
  async (payload, thunkAPI) => {
    try {
      console.log('pay', payload);
      const Axios = await AxiosBase();
      const { data } = await Axios.post('/forgot-password', payload);
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
      const errorMsg = responseData?.error || responseData|| 'An error occurred';

      return thunkAPI.rejectWithValue({
        msg: errorMsg,
        status: error.response.status,
      }) ;
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

