import { createAction } from '@reduxjs/toolkit';

export type BoardPayload = {
  name: string;
  backgroundColor: string;
  workspace: string;
  [key: string]: string | undefined;
};

export const createBoard = createAction<BoardPayload>('CREATE_BOARD');
export const createBoardSuccess = createAction('CREATE_BOARD_SUCCESS');
export const createBoardFailure = createAction('CREATE_BOARD_FAILURE');
