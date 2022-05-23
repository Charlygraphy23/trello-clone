import { createAction } from '@reduxjs/toolkit';

export const profileLoad = createAction('PROFILE_LOAD');
export const profileLoadSuccess = createAction('PROFILE_LOAD_SUCCESS');
export const profileLoadFailure = createAction('PROFILE_LOAD_FAILURE');
