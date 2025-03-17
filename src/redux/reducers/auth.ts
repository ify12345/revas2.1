/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { getProfile, getServices, login, register } from '@/src/api/auth';
import { User } from '@/src/typings';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';



interface State {
  user: User;
  // profile: object;
  isAuthenticated: boolean;
  isVerified: boolean;
  isPhoneVerified: boolean;
}

const initialState: State = {
  user: {},
  profile:{},
  services:{},
  isAuthenticated: false,
  isVerified: false,
  isPhoneVerified: false,
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
    builder
      .addCase(login.pending, state => {
        state.isAuthenticated = false;
        state.isVerified = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isVerified = true;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
    
      })
      .addCase(getServices.fulfilled, (state, { payload }) => {
        state.services = payload;
  
      })
    // builder
    //   .addCase(EmailVerification.pending, state => {
    //     state.isAuthenticated = false;
    //     state.isVerified = false;
    //     state.isPhoneVerified = false;
    //   })
    //   .addCase(EmailVerification.fulfilled, (state, {payload}) => {
    //     state.isAuthenticated = true;
    //     state.isVerified = payload.email_verified;
    //     state.isPhoneVerified = payload.phone_verified;
    //   });
  },
});

export const {getUserDetails, success, logout} = authSlice.actions;
export default authSlice.reducer;
