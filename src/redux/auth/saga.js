import { all, call, put, takeEvery } from "redux-saga/effects";

import AuthRepository from "../../repositry/AuthRepositry";

import {
  actionTypes,
  loginSuccess,
  logOutSuccess,
  authError,
  loading,
} from "./actions";

function* loginSaga(data) {
  try {
    yield put(loading(true));
    yield put(authError(null));
    const userData = yield AuthRepository.logInWithEmailAndPassword(data.payload);
    yield put(loginSuccess(userData));
    alert("Login Successfully.");
  } catch (err) {
    yield put(authError(err));
  }
  yield put(loading(false));
}

function* logOutSaga() {
  try {
    yield AuthRepository.logout();
    yield put(logOutSuccess());
    alert("Logout Sucessfully");
  } catch (err) {
    yield put(authError(err.message));
  }
}

function* registerLocalSaga({ payload }) {
  try {
    yield put(loading(true));
    yield put(authError(null));
    let response = yield call(
      AuthRepository.registerWithEmailAndPassword,
      payload.data
    );
    yield put(loginSuccess({ user: response }));
    alert("Account Created successfully!");
    if (payload.callback) {
      payload.callback();
    }
  } catch (err) {
    yield put(authError(err));
  }
  yield put(loading(false));
}

function* loginSocial({ payload }) {
 
  try {
    yield put(loading(true));
    yield put(authError(null));
    let response = yield call(AuthRepository.socialSignIn, payload);

    yield put(loginSuccess({ user: response }));
    alert("Login  successfully!");
  } catch (err) {
    alert("Unable to Login Please Try Again !");
    yield put(authError("Unable to Login Please Try Again !"));
  }
  yield put(loading(false));
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  yield all([takeEvery(actionTypes.REGISTER_LOCAL, registerLocalSaga)]);
  yield all([takeEvery(actionTypes.SOCIAL_LOGIN, loginSocial)]);
}
