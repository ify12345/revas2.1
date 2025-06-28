/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosBase from './axios'
import {
  approveUsersPayload,
  AsyncThunkConfig,
  forgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from '@/types/api'

import {
  approveResponse,
  forgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from '@/types/apiResponse'
import apiCall from './apiCall'
import axios from 'axios'

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  AsyncThunkConfig
>('account-managers/register', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload)
  return apiCall(Axios.post('/account-managers/register', payload), thunkAPI)
})

export const getPendingUsers = createAsyncThunk<[], void, AsyncThunkConfig>(
  '/users/get-pending',
  async (_, thunkAPI) => {
    const Axios = await AxiosBase()
    return apiCall(Axios.get('/account-managers/pending-users'), thunkAPI)
  }
)

export const approveUsers = createAsyncThunk<
  approveResponse,
  approveUsersPayload,
  AsyncThunkConfig
>('/users/approve', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(
    Axios.patch(`/account-managers/users/${payload.userId}/approve`),
    thunkAPI
  )
})

export const rejectUsers = createAsyncThunk<
  approveResponse,
  approveUsersPayload,
  AsyncThunkConfig
>('/users/reject', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(
    Axios.patch(`/account-managers/users/${payload.userId}/reject`),
    thunkAPI
  )
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

export const fetchNigerianStates = createAsyncThunk<
  string[],
  void,
  AsyncThunkConfig
>('location/fetchNigerianStates', async (_, thunkAPI) => {
  const response = await axios.get('https://nga-states-lga.onrender.com/fetch')
  return response.data
})
