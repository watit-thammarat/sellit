import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { REGISTER_USER, SIGNIN_USER, AUTO_SIGNIN } from './types';

const API_KEY = 'AIzaSyAnN7GH5zET9KfiiUFr0Bvib33ZMUQMu1U';

export const signUp = (input, cb) => async dispatch => {
  try {
    const { data } = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
      { ...input, returnSecureToken: true }
    );
    const { localId, idToken, refreshToken } = data;
    dispatch({
      type: REGISTER_USER,
      payload: { uid: localId, token: idToken, refToken: refreshToken }
    });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const signIn = (input, cb) => async dispatch => {
  try {
    const { data } = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
      { ...input, returnSecureToken: true }
    );
    const { localId, idToken, refreshToken } = data;
    dispatch({
      type: SIGNIN_USER,
      payload: { uid: localId, token: idToken, refToken: refreshToken }
    });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const autoSignIn = (refToken, cb) => async dispatch => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refToken);
    const { data } = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      params
    );
    const { user_id, id_token, refresh_token } = data;
    dispatch({
      type: AUTO_SIGNIN,
      payload: { uid: user_id, token: id_token, refToken: refresh_token }
    });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};
