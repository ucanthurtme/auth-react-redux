import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
} from './types';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function (dispatch) {
    // submit email/password to the server
    axios
      .post(`${API_URL}/signin`, {
      email,
      password,
      })
      .then(response => {
        // if request is good...
        // - update state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(err => {
        // if request is bad...
        // show an error to the user
        dispatch(authError('bad login info'));
      });
  };
};

export function signoutUser() {
  localStorage.removeItem('toke');
  return {
    type: UNAUTH_USER,
  };
};

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('feature');
      })
      .catch(err => {
        dispatch(authError('Email in use'))
      });
  };
};


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
};

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(API_URL, {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        })
      })
  };
};


export function fetchMessage() {

}
