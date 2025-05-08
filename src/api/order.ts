/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosBase from './axios'
import apiCall from './apiCall'
import {
  AsyncThunkConfig,
  CreateOrderPayload,
  Document,
  EditOrderPayload,
  generateOrderPayload,
  GetOrderPayload,
} from '@/types/api'
import {
  CreateOrderResponse,
  deleteOrderResponse,
  generateOrderResponse,
  GetDraftResponse,
  GetOrderResponse,
} from '@/types/apiResponse'

interface UploadPayload {
  orderId: string
  file: File
}

export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderPayload,
  AsyncThunkConfig
>('/create-order', async (formData, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', formData)
  return apiCall(Axios.post('/create-order', formData), thunkAPI)
})

export const saveOrder = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderPayload,
  AsyncThunkConfig
>('/save-order', async (formData, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', formData)
  return apiCall(Axios.post('/save-order', formData), thunkAPI)
})

export const getOrder = createAsyncThunk<
  GetOrderResponse,
  GetOrderPayload,
  AsyncThunkConfig
>('/api/get-order', async (_, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(Axios.get('/api/orders/dashboard'), thunkAPI)
})

export const getDrafts = createAsyncThunk<
  GetDraftResponse,
  GetOrderPayload,
  AsyncThunkConfig
>('/api/get-drafts', async (_, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(Axios.get('/saved-orders'), thunkAPI)
})

export const deleteOrder = createAsyncThunk<
  deleteOrderResponse,
  GetOrderPayload,
  AsyncThunkConfig
>('/api/delete-order', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(Axios.delete(`/delete-orders/${payload}`, payload), thunkAPI)
})

export const editOrder = createAsyncThunk<
  deleteOrderResponse,
  EditOrderPayload,
  AsyncThunkConfig
>('/api/edit-order', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(Axios.put(`/update-orders/${payload.id}`), thunkAPI)
})

export const editStatus = createAsyncThunk<
  deleteOrderResponse,
  EditOrderPayload,
  AsyncThunkConfig
>('/api/edit-status', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  // console.log(payload.status)
  return apiCall(
    Axios.patch(`/api/orders/${payload.id}/status`, { status: payload.status }),
    thunkAPI
  )
})

export const generateOrder = createAsyncThunk<
  generateOrderResponse,
  generateOrderPayload,
  AsyncThunkConfig
>('/generate-doc', async (payload, thunkAPI) => {
  const Axios = await AxiosBase()
  console.log('pay', payload.id)
  return apiCall(Axios.post(`/documents/orders/${payload.id}`), thunkAPI)
})

export const getDocuments = createAsyncThunk<
  Document[],
  GetOrderPayload,
  AsyncThunkConfig
>('/get-doc', async (_, thunkAPI) => {
  const Axios = await AxiosBase()
  return apiCall(Axios.get(`/documents/client`), thunkAPI)
})

export const uploadDocument = createAsyncThunk<
  any,
  UploadPayload,
  AsyncThunkConfig
>('/upload-doc', async ({ orderId, file }, thunkAPI) => {
  const Axios = await AxiosBase()
  const formData = new FormData()
  formData.append('file', file)
  // console.log('file', orderId)
  return apiCall(
    Axios.post(`/documents/orders/${orderId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    thunkAPI
  )
})