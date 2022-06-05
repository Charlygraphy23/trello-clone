import { createReducer } from '@reduxjs/toolkit';
import {
  addBulkTaskData,
  addTask,
  updateTaskInfo,
  updateTaskLabel
} from 'store/actions';

export type TaskConstant = {
  _id?: string;
  content: string;
  taskId: string;
  listId: string;
  createdBy?: string;
  boardId?: string;
  createdAt?: string;
  description?: string;
  labels?: string[];
};

export type TaskDataType = {
  [k: string]: TaskConstant;
};

const initialState: TaskDataType = {};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => ({
      ...state,
      [action.payload.taskId]: action.payload
    }))
    .addCase(addBulkTaskData, (state, action) => action.payload)
    .addCase(updateTaskInfo, (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        ...state[action.payload.taskId],
        ...action.payload.data
      }
    }))
    .addCase(updateTaskLabel, (state, action) => {
      const { taskId, labels } = action.payload;

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          labels
        }
      };
    });
});
