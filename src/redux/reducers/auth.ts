/* eslint-disable @typescript-eslint/no-explicit-any */

import { login, register, registerUser, UserLogin } from '@/api/auth';
import { getNotifications } from '@/api/order';
import { User } from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface State {
  user: User;
  profile: object;
  isAuthenticated: boolean;
  isVerified: boolean;
  isPhoneVerified: boolean;
  hasProduct: boolean;
  notifications: {
    data: Notification[];
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

interface Notification {
  id: string
  type: string
  message: string
  isRead: boolean
  title: string
  body: string
  read: boolean
  createdAt: string
  userId?: string
  metadata?: Record<string, any>
}

const initialState: State = {
  user: {}, 
  profile:{},
  isAuthenticated: false,
  isVerified: false,
  isPhoneVerified: false,
  hasProduct: false,
  notifications: {
    data: [],
    total: 0,
    currentPage: 1,
    totalPages: 0,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserDetails: (state, actions: PayloadAction<User>) => {
      state.user = {...state.user, ...actions.payload};
    },
    success: state => {
      state.isVerified = true;
    },
    logout: () => ({...initialState}),
  },
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, {payload}) => {
      state.user = payload;
      console.log('payload:', payload);
      
      // state.isAuthenticated = true;
    });
    builder.addCase(registerUser.fulfilled, (state, {payload}) => {
      state.user = payload;
      console.log('payload:', payload);
      
      // state.isAuthenticated = true;
    });
    builder
      .addCase(login.pending, state => {
        state.isAuthenticated = false;
        state.isVerified = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log('payload:', payload);
        state.user = payload.user;
        state.isVerified = true;
        state.isAuthenticated = true;
      })
    builder
      .addCase(UserLogin.pending, state => {
        state.isAuthenticated = false;
        state.isVerified = false;
      })
      .addCase(UserLogin.fulfilled, (state, { payload }) => {
        console.log('payload:', payload.user);
        state.hasProduct = payload.user.hasRegisteredProduct;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.notifications = {
          data: payload.data,
          total: payload.total,
          currentPage: payload.currentPage,
          totalPages: payload.totalPages,
        };
      });
  },
});

export const {getUserDetails, success, logout} = authSlice.actions;
export default authSlice.reducer;
