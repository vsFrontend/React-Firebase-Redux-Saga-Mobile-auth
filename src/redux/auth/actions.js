export const actionTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  AUTH_LOADING: "AUTH_LOADING",
  AUTH_ERROR: "AUTH_ERROR",
  REGISTER_LOCAL: "REGISTER_LOCAL",
  SOCIAL_LOGIN: "SOCIAL_LOGIN",
};

export function loading(payload) {
  return { type: actionTypes.AUTH_LOADING, payload };
}
export function authError(payload) {
  return { type: actionTypes.AUTH_ERROR, payload };
}

export function login(payload) {
  return { type: actionTypes.LOGIN_REQUEST, payload };
}

export function loginSuccess(payload) {
  return { type: actionTypes.LOGIN_SUCCESS, payload: payload };
}

export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function registerLocal(payload) {
  return { type: actionTypes.REGISTER_LOCAL, payload };
}

export function socialLogin(payload) {
  return { type: actionTypes.SOCIAL_LOGIN, payload };
}
