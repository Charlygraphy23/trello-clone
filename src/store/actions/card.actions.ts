import { createAction } from '@reduxjs/toolkit';
import {
  addCheckListGroupApi,
  addCommentToTaskApi,
  deleteACheckList,
  deleteCheckListGroupApi,
  deleteCommentsApi,
  deleteTaskLabelApi,
  toggleMemberTask,
  updateCheckListApi,
  updateLabelToBoardApi
} from 'api';
import { Dispatch } from 'react';
import { ColumnReducerType } from 'store/reducers/column.reducer';
import { TaskCommentType, TaskDataType } from 'store/reducers/task.reducer';

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

type AddCheckListType = {
  taskId: string;
  checkListId: string;
  isDone: boolean;
  title: string;
  checkListGroupId: string;
};

type AddCheckListGroup = {
  taskId: string;
  checkListGroupId: string;
  name: string;
};

type AddTaskMember = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  taskId: string;
  remove?: boolean;
};

type AddMyCommentType = {
  _id?: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  message: string;
  taskId: string;
  commentId: string;
};

type UpdateLabelType = {
  labelId: string;
  backgroundColor: string;
  name: string;
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
export const updateLabel = createAction<UpdateLabelType>('UPDATE_LABEL');
export const deleteLabel = createAction<{ labelId: string }>('DELETE_LABEL');

export const addCheckList = createAction<AddCheckListType>('ADD_CHECK_LIST');
export const updateCheckList = createAction<{
  checkListId: string;
  isDone: boolean;
  taskId: string;
  checkListGroupId: string;
}>('UPDATE_CHECKLIST');
export const deleteCheckList = createAction<{
  checkListId: string;
  checkListGroupId: string;
  taskId: string;
}>('DELETE_CHECKLIST');

export const addCheckListGroup = createAction<AddCheckListGroup>(
  'ADD_CHECK_LIST_GROUP'
);

export const deleteCheckListGroup = createAction<{
  checkListGroupId: string;
  taskId: string;
}>('DELETE_CHECK_LIST_GROUP');

export const addMemberToTask =
  createAction<AddTaskMember>('ADD_MEMBER_TO_TASK');

export const addMyComment = createAction<AddMyCommentType>('ADD_MY_COMMENT');

export const loadComments = createAction<{ taskId: string }>('LOAD_COMMENTS');
export const loadCommentsSuccess = createAction<{
  taskId: string;
  data: TaskCommentType[];
}>('LOAD_COMMENTS_SUCCESS');
export const loadCommentsFailure = createAction<string>(
  'LOAD_COMMENTS_FAILURE'
);

export const deleteComment =
  createAction<{ taskId: string; commentId: string }>('DELETE_COMMENT');

export const addCheckListAction = async ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: AddCheckListType;
}) => {
  dispatch(addCheckList(data));

  await updateCheckListApi(data);
};

export const updateCheckListAction = async ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: AddCheckListType;
}) => {
  const { checkListId, isDone, taskId, checkListGroupId } = data;

  dispatch(
    updateCheckList({
      checkListId,
      isDone,
      taskId,
      checkListGroupId
    })
  );

  await updateCheckListApi(data);
};

export const addCheckListGroupAction = async ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: AddCheckListGroup;
}) => {
  dispatch(addCheckListGroup(data));
  // @ts-expect-error
  // eslint-disable-next-line no-param-reassign
  data.title = data.name;

  // @ts-expect-error
  // eslint-disable-next-line no-param-reassign
  delete data.name;

  await addCheckListGroupApi(data);
};

export const deleteCheckListAction = async ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: any;
}) => {
  dispatch(
    deleteCheckList({
      checkListId: data?.checkListId,
      checkListGroupId: data?.checkListGroupId,
      taskId: data?.taskId
    })
  );

  await deleteACheckList(data?.checkListId);
};

export const deleteCheckListGroupAction = async ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: { checkListGroupId: string; taskId: string };
}) => {
  dispatch(deleteCheckListGroup(data));

  await deleteCheckListGroupApi(data.checkListGroupId);
};

export const addTaskMemberAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: AddTaskMember;
}) => {
  dispatch(addMemberToTask(data));

  toggleMemberTask({
    taskId: data.taskId,
    remove: data.remove
  });
};

export const addMyCommentAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: AddMyCommentType;
}) => {
  dispatch(addMyComment(data));

  addCommentToTaskApi({
    message: data.message,
    taskId: data.taskId,
    commentId: data.commentId
  });
};

export const deleteCommentAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: { taskId: string; commentId: string };
}) => {
  dispatch(deleteComment(data));

  deleteCommentsApi(data.commentId);
};

export const updateLabelAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: UpdateLabelType;
}) => {
  dispatch(updateLabel(data));
  updateLabelToBoardApi(data);
};

export const deleteLabelAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: { labelId: string };
}) => {
  dispatch(deleteLabel(data));

  deleteTaskLabelApi(data.labelId);
};
