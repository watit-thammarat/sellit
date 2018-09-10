import axios from 'axios';

import {
  REGISTER_USER,
  SIGNIN_USER,
  AUTO_SIGNIN,
  GET_USER_POSTS
} from './types';
import { setTokens, getExpiration } from '../../utils/misc';

const API_KEY = 'AIzaSyAnN7GH5zET9KfiiUFr0Bvib33ZMUQMu1U';
const BASE_URL = 'https://articles-196d0.firebaseio.com';

export const signUp = (input, cb) => async dispatch => {
  try {
    const { data } = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
      { ...input, returnSecureToken: true }
    );
    const { localId, idToken, refreshToken } = data;
    const payload = {
      uid: localId,
      token: idToken,
      refToken: refreshToken,
      expiration: getExpiration()
    };
    await setTokens(payload);
    dispatch({
      type: REGISTER_USER,
      payload
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
    const payload = {
      uid: localId,
      token: idToken,
      refToken: refreshToken,
      expiration: getExpiration()
    };
    await setTokens(payload);
    dispatch({
      type: SIGNIN_USER,
      payload
    });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const autoSignIn = (refToken, cb) => async dispatch => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      data: `grant_type=refresh_token&refresh_token=${refToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { user_id, id_token, refresh_token } = data;
    const payload = {
      uid: user_id,
      token: id_token,
      refToken: refresh_token,
      expiration: getExpiration()
    };
    await setTokens(payload);
    dispatch({
      type: AUTO_SIGNIN,
      payload
    });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const getUserPosts = cb => async (dispatch, getState) => {
  try {
    const { uid } = getState().user.userData;
    const { data } = await axios.get(
      `${BASE_URL}/articles.json/?orderBy=\"uid\"&equalTo=\"${uid}\"`
    );
    const payload = [];
    for (const id in data) {
      payload.push({ ...data[id], id });
    }
    dispatch({ type: GET_USER_POSTS, payload });
    cb();
  } catch (err) {
    console.log(err);
    cb(err.response.data);
  }
};
