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

export const updateCheckListApi = (payload: any) =>
  privateAxios.put('/user/update-checklist', payload);

export const addCheckListGroupApi = (payload: any) =>
  privateAxios.post('/user/add-checklist-group', payload);

export const deleteACheckList = (checkListId: string) =>
  privateAxios.delete(`/user/delete-checkList/${checkListId}`);

export const deleteCheckListGroupApi = (checkListGroupId: string) =>
  privateAxios.delete(`/user/delete-checkList-group/${checkListGroupId}`);
