/* eslint-disable */

import { push } from 'react-router-redux';
// import { roles } from '../../../config/default';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const RESET_ERRORS = 'auth/RESET_ERRORS';

const initialState = {
  loading: false,
  loggingIn: false,
  loggingOut: false,
  user: null,
  error: null,
  logoutError: null,
  loginError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, user: action.result };
    case LOAD_FAIL:
      return { ...state, loading: false, error: action.error };

    case LOGIN:
      return { ...state, loggingIn: true };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, user: action.result };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, user: null, loginError: action.error };

    case LOGOUT:
      return { ...state, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, user: null };
    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, logoutError: action.error };

    case RESET_ERRORS:
      return { ...state, error: null, loginError: null, logoutError: null };

    default:
      return state;
  }
}

export function getUserHomeUrl(user) {
  let homeUrl = '';
  return '/dashboard';
  switch (user.role) {
    case roles.ADMIN:
      homeUrl = '/admin/dashboard';
      break;
    case roles.USER:
    case roles.ORG_ADMIN:
      homeUrl = '/';
      break;
    default:
      homeUrl = '/';
      break;
  }
  return homeUrl;
}


export function resetErrors() {
  return dispatch => dispatch({ type: RESET_ERRORS });
}

export function logout() {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch(resetErrors);
    dispatch({ type: LOGOUT });
    api
      .del('/sessions')
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(push('/'));
        resolve();
      })
      .catch(error => {
        dispatch({ type: LOGOUT_FAIL, error });
        reject();
      });
  });
}

export function load() {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch(resetErrors);

    if (getState().auth.user) {
      return resolve();
    }

    dispatch({ type: LOAD });
    api
      .get('/api/sessions')
      .then(result => {
        if (result.user === null && result.message && result.message.output && result.message.output.payload) {
          dispatch({
            type: LOAD_FAIL,
            error: result.message.output.payload.error || result.message.output.payload.message
          });
        }

        dispatch({ type: LOAD_SUCCESS, result: result.user });
        resolve();
      })
      .catch(error => {
        dispatch({ type: LOAD_FAIL, error });
        reject(error);
      });
  });
}

export function login(user) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    let errorMsg = '';
    if (!user.email) {
      errorMsg = 'Username/Password missing!';
      dispatch({ type: LOGIN_FAIL, error: errorMsg });
      reject(errorMsg);
    }

    api
      .post('/api/sessions', {data: { email: user.username, password: user.password } })
      .then(result => {
          console.log('this is login user', result);
          dispatch({ type: LOGIN_SUCCESS, result: result.user });
          dispatch(push('/dashboard'));
          resolve();
      })
      .catch(error => {
        console.log('This is error', error.message);
        dispatch({
          type: LOGIN_FAIL,
          error: error && (error.message || error.message.username || error.message.password || error)
        });
        reject();
      });
  });
}
