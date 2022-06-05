import { privateAxios } from './http';

export const addList = (payload: any) =>
  privateAxios.post('/user/add-list', payload);

export const addTaskApi = (payload: any) =>
  privateAxios.post('/user/add-task', payload);

export const updateTaskAndColumnPosApi = (payload: any) =>
  privateAxios.put('/user/update-task-column', payload);

export const addDescriptionToTask = (payload: any) =>
  privateAxios.put('/user/add-task-info', payload);

export const updateTaskLabelsApi = (payload: any) =>
  privateAxios.put('/user/update-task-labels', payload);
