import { all } from 'redux-saga/effects';
import { authSaga } from './auth.saga';
import boardSaga from './board.saga';
import homeSaga from './home.saga';
import profileSaga from './profile.saga';
import { workspaceSaga } from './workpase.saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    workspaceSaga(),
    homeSaga(),
    boardSaga()
  ]);
}
