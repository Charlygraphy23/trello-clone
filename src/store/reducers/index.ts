import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth.reducer';
import BoardedReducer from './board.reducer';
import ColumReducer from './column.reducer';
import HomeReducer from './home.reducer';
import profileReducer from './profile.reducer';
import TaskReducer from './task.reducer';
import WorkspaceReducer from './workspace.reducer';

export default combineReducers({
  AuthReducer: authReducer,
  ProfileReducer: profileReducer,
  WorkspaceReducer,
  HomeReducer,
  BoardedReducer,
  TaskReducer,
  ColumReducer
});
