/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  addBulkColumnData,
  addTaskToColumn,
  createList,
  updateColumnsData
} from 'store/actions';

export type ColumnElementType = {
  _id?: string;
  title: string;
  taskIds: string[];
  listId: string;
  createdBy?: string;
  boardId?: string;
  createdAt?: string;
};

export type ColumnDataType = {
  [k: string]: ColumnElementType;
};

export type ColumStateType = {
  columns: ColumnDataType | null;
  columnOrder: string[];
};

const initialState: ColumStateType = {
  columns: null,
  columnOrder: []
};

export type ColumnReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createList, (state, action) => ({
      ...state,
      columns: {
        ...state.columns,
        [action.payload.listId]: {
          taskIds: [],
          ...action.payload
        }
      },
      columnOrder: [...state.columnOrder, action.payload.listId]
    }))
    .addCase(updateColumnsData, (state, action) => ({
      ...state,
      ...action.payload
    }))
    .addCase(addTaskToColumn, (state, action) => {
      if (!state.columns) return state;
      if (!state.columns[action.payload.column].taskIds) {
        state.columns[action.payload.column].taskIds = [action.payload.taskId];
        return state;
      }
      state.columns[action.payload.column].taskIds.push(action.payload.taskId);
    })
    .addCase(addBulkColumnData, (state, action) => action.payload);
});
