/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { addBulkLabels, addLabels, editLabel } from 'store/actions';

export type LabelType = {
  name: string;
  backgroundColor: string;
  boardId: string;
  labelId: string;
  createdBy?: string;
};

const initialState = {
  labels: [] as LabelType[]
};

export type LabelStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addLabels, (state, action) => ({
      ...state,
      labels: [
        ...state.labels,
        {
          ...action.payload
        }
      ]
    }))
    .addCase(editLabel, (state, action) => {
      const { backgroundColor, boardId, labelId, name, createdBy } =
        action.payload;

      return {
        ...state,
        labels: state.labels.map((label) => {
          if (label.labelId) {
            return {
              backgroundColor,
              boardId,
              labelId,
              name,
              createdBy
            };
          }

          return label;
        })
      };
    })
    .addCase(addBulkLabels, (state, action) => ({
      ...state,
      labels: [...state.labels, ...action.payload]
    }));
});
