import axios from 'axios';
import Promise from 'bluebird';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

export function failedLogin(message) {
  return {
    type: LOGIN_FAILURE,
    isFethcning: false,
    isAuthenticated: false,
    message,
  };
}


// Thunks

export function userLogin(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.post('http://localhost:3001/sessions/create', config)
      .then((response) => {
        const { user } = response.data;
        if (!response.ok) {
          dispatch(failedLogin(user.message));
          return Promise.reject(user);
        }
        // set the token in local when successful
        localStorage.setItem('id_token', user.id_token);
        dispatch(receiveLogin(user));
        return null;
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
}
