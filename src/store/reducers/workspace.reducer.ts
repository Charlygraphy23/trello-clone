/* eslint-disable prettier/prettier */
import { createReducer } from '@reduxjs/toolkit';
import {
  createWorkspace,
  createWorkspaceFailure,
  createWorkspaceSuccess
} from 'store/actions';



const initialState = {
  loading: false,
  error: '',
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createWorkspace, (state) => ({
      ...state,
      loading: true,
      error: '',
      data: []
    }))
    .addCase(createWorkspaceSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: ''
    }))
    .addCase(createWorkspaceFailure, (state, action) => ({
      ...state,
      error: action.payload ?? '',
      loading: false
    }));
});
