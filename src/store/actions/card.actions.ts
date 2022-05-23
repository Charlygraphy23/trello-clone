import { createAction } from '@reduxjs/toolkit';

export const createList =
  createAction<{ id: string; title: string }>('CREATE_LIST');

export const addTask =
  createAction<{ id: string; content: string }>('ADD_TASK');
