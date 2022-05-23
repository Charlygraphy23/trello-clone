/* eslint-disable prettier/prettier */
import { getProfile } from 'api/profile';
import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
    profileLoad,
    profileLoadFailure,
    profileLoadSuccess
} from 'store/actions/user.action';

function* loadProfileData() {
  try {
    const { data = {} } = (yield getProfile()) as AxiosResponse<any>;

    yield put({ type: profileLoadSuccess.toString(), payload: data.data });
  } catch (err: any) {
    yield put({ type: profileLoadFailure.toString(), payload: err.message });
  }
}

export default function* profileSaga() {
  yield takeLatest(profileLoad.toString(), loadProfileData);
}
