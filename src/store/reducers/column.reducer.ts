import { createReducer } from '@reduxjs/toolkit';
import { createList } from 'store/actions';

type ColumnData = {
  id: string;
  title: string;
  taskIds: string[] | [];
};

type ColumnDataType = {
  [k: string]: ColumnData;
};

export type ColumStateType = {
  columns: ColumnDataType;
  columnOrder: string[];
};

const initialState: ColumStateType = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: [
        'task-1',
        'task-2',
        'task-3',
        'task-4',
        'task-5',
        'task-6',
        'task-7',
        'task-8'
      ]
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
};

export default createReducer(initialState, (builder) => {
  builder.addCase(createList, (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...action.payload,
      taskIds: []
    }
  }));
});
