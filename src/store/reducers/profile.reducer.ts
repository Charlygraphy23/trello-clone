/* eslint-disable prettier/prettier */
import { createReducer } from '@reduxjs/toolkit';
import {
    profileLoad,
    profileLoadFailure,
    profileLoadSuccess
} from 'store/actions/user.action';

const initialState = {
  loading: false,
  error: '',
  firstName: '',
  lastName: '',
  email: '',
  loginType: '',
  profileImage: '',
  isRegistered: false,
  createdAt: '',
  updatedAt: ''
};

export type ProfileType = typeof initialState;

const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(profileLoad, (state) => ({
      ...state,
      loading: true,
      error: ''
    }))
    .addCase(profileLoadSuccess, (state, action) => {
      const {
        firstName = '',
        lastName = '',
        email = '',
        loginType = '',
        profileImage = '',
        isRegistered = false,
        createdAt = '',
        updatedAt = ''
      }: any = action.payload;
      return {
        ...state,
        loading: false,
        error: '',
        firstName,
        lastName,
        email,
        loginType,
        profileImage,
        isRegistered,
        createdAt,
        updatedAt
      };
    })
    .addCase(profileLoadFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ?? ''
    }));
});

export default profileReducer;