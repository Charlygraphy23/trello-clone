import { createAction } from '@reduxjs/toolkit';
import { ColumnReducerType } from 'store/reducers/column.reducer';
import { TaskDataType } from 'store/reducers/task.reducer';

export type CreateListType = { listId: string; title: string; boardId: string };
export type AddTaskType = {
  taskId: string;
  content: string;
  boardId: string;
  listId: string;
};

type UpdateColumnAndTaskPosType = {
  listId: string;
  taskId?: string;
  order: number;
  type: string;
  boardId: string;
  draggableId: string;
  source: any;
  destination: any;
};

export const createList = createAction<CreateListType>('CREATE_LIST');
// export const createListSuccess = createAction('CREATE_LIST_SUCCESS');
// export const createListFailure = createAction('CREATE_LIST_FAILURE');

export const addTask = createAction<AddTaskType>('ADD_TASK');
// export const addTaskSuccess = createAction<AddTaskType>('ADD_TASK_SUCCESS');
// export const addTaskFailure = createAction<AddTaskType>('ADD_TASK_FAILURE');

export const addTaskToColumn =
  createAction<{ taskId: string; column: string }>('ADD_TASK_TO_COLUMN');

export const updateColumnsData = createAction<any>('UPDATE_COLUMNS_DATA');

export const addBulkColumnData = createAction<ColumnReducerType>(
  'ADD_BULK_COLUMN_DATA'
);

export const addBulkTaskData = createAction<TaskDataType>('ADD_BULK_TASK_DATA');

export const updateTaskAndColumnPosition =
  createAction<UpdateColumnAndTaskPosType>('UPDATE_COLUMN_TASK_POSITION');

export const updateTaskAndColumnPositionSuccess = createAction(
  'UPDATE_COLUMN_TASK_POSITION_SUCCESS'
);

export const updateTaskAndColumnPositionFailure = createAction(
  'UPDATE_COLUMN_TASK_POSITION_FAILURE'
);

export const updateTaskInfo =
  createAction<{ taskId: string; data: any }>('ADD_TASK_INFO');

export const updateTaskLabel =
  createAction<{ taskId: string; labels: string[] }>('UPDATE_TASK_LABEL');
