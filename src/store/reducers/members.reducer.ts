/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { addBulkMembers } from 'store/actions';

export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  [k: string]: any;
};

export type MemberDataType = {
  _id?: string;
  boardId: string;
  role: string;
  user: UserType;
  [k: string]: any;
};

const initialState = {
  members: [] as MemberDataType[]
};

export type MemberReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder.addCase(addBulkMembers, (state, action) => ({
    ...state,
    members: action.payload
  }));
});
