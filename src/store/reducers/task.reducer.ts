import { createReducer } from '@reduxjs/toolkit';
import {
  addBulkTaskData,
  addCheckList,
  addCheckListGroup,
  addTask,
  deleteCheckList,
  deleteCheckListGroup,
  updateCheckList,
  updateTaskInfo,
  updateTaskLabel
} from 'store/actions';

export type TaskCheckListType = {
  _id?: string;
  taskId?: string;
  title?: string;
  createdBy?: string;
  checkListId?: string;
  checkListGroupId?: string;
  isDone?: boolean;
};

export type TaskCheckListGroupType = {
  _id?: string;
  taskId?: string;
  title?: string;
  createdBy?: string;
  checkListGroupId?: string;
  checkLists?: TaskCheckListType[];
};

export type TaskConstant = {
  _id?: string;
  content: string;
  taskId: string;
  listId: string;
  createdBy?: string;
  boardId?: string;
  createdAt?: string;
  description?: string;
  order?: number;
  labels?: string[];
  checkListGroups?: TaskCheckListGroupType[];
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
    })
    .addCase(addCheckListGroup, (state, action) => {
      const { taskId, checkListGroupId, name } = action.payload;

      const groups = Array.from(state[taskId]?.checkListGroups ?? []);

      groups.push({
        taskId,
        checkListGroupId,
        title: name
      });

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          checkListGroups: groups
        }
      };
    })
    .addCase(addCheckList, (state, action) => {
      const { taskId, checkListGroupId } = action.payload;
      const checkListGroups = state[taskId]?.checkListGroups ?? [];
      const updatedCheckListGroups = checkListGroups.map((checkListGroup) => {
        if (checkListGroup.checkListGroupId === checkListGroupId) {
          const checkLists = checkListGroup?.checkLists ?? [];

          return {
            ...checkListGroup,
            checkLists: [...checkLists, action?.payload]
          };
        }

        return checkListGroup;
      });

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          checkListGroups: updatedCheckListGroups
        }
      };
    })
    .addCase(updateCheckList, (state, action) => {
      const { checkListId, taskId, checkListGroupId } = action.payload;
      const checkListGroups = state[taskId]?.checkListGroups ?? [];

      const updatedCheckListGroups = checkListGroups.map((checkListGroup) => {
        if (checkListGroup.checkListGroupId === checkListGroupId) {
          const checkLists = Array.from(checkListGroup?.checkLists ?? []);
          const checkListIndex = checkLists.findIndex(
            (checkList) => checkList.checkListId === checkListId
          );

          if (checkListIndex === -1) return checkListGroup;

          checkLists[checkListIndex] = {
            ...checkLists[checkListIndex],
            ...action?.payload
          };
          return {
            ...checkListGroup,
            checkLists
          };
        }

        return checkListGroup;
      });

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          checkListGroups: updatedCheckListGroups
        }
      };
    })
    .addCase(deleteCheckList, (state, action) => {
      const { taskId, checkListGroupId, checkListId } = action.payload;

      const groups: TaskCheckListGroupType[] = Array.from(
        state[taskId]?.checkListGroups ?? []
      );

      const updatedGroup = groups.map((grp) => {
        if (grp.checkListGroupId === checkListGroupId) {
          const updateCheckListArray: TaskCheckListType[] | undefined =
            grp.checkLists?.filter(
              (checkList) => checkList.checkListId !== checkListId
            );

          return {
            ...grp,
            checkLists: Array.from(updateCheckListArray ?? [])
          };
        }

        return grp;
      });

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          checkListGroups: updatedGroup
        }
      };
    })
    .addCase(deleteCheckListGroup, (state, action) => {
      const { checkListGroupId, taskId } = action.payload;

      const groups: TaskCheckListGroupType[] | undefined = state[
        taskId
      ]?.checkListGroups?.filter(
        (group) => group.checkListGroupId !== checkListGroupId
      );

      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          checkListGroups: Array.from(groups ?? [])
        }
      };
    });
});
