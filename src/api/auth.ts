import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosBase from './axios';
import {
  AsyncThunkConfig,
  forgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from '@/types/api';

import {
  forgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from '@/types/apiResponse'
import apiCall from './apiCall';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>('account-managers/register', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload)
  return apiCall(Axios.post('/account-managers/register', payload), thunkAPI)
})

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>('users/register', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload)
  return apiCall(Axios.post('/register', payload), thunkAPI)
})

export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  AsyncThunkConfig
>('account-managers/login', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload)
  return apiCall(
    Axios.post('/account-managers/login', payload),
    thunkAPI,
    'auth'
  )
})

export const UserLogin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  AsyncThunkConfig
>('/users/login', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload)
  return apiCall(Axios.post('/login', payload), thunkAPI, 'auth')
})

export const forgotPassword = createAsyncThunk<
  forgotPasswordResponse,
  forgotPasswordPayload,
  AsyncThunkConfig
>('/users/forgot-password', async (payload, thunkAPI) => {
  console.log('pay', payload)
  const Axios = await AxiosBase()
  return apiCall(Axios.post('/forgot-password', payload), thunkAPI)
})

export const resetPassword = createAsyncThunk<
  forgotPasswordResponse,
  forgotPasswordPayload,
  AsyncThunkConfig
>('/users/reset-password', async (payload, thunkAPI) => {
  console.log('pay', payload)
  const passwordData = {
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  }
  const Axios = await AxiosBase()
  return apiCall(
    Axios.post(`/reset-password/${payload.pin}`, passwordData),
    thunkAPI
  )
})
