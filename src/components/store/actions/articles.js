import axios from 'axios';

import {
  GET_ARTICLES,
  ADD_ARTICLE,
  RESET_ARTICLE,
  DELETE_ARTICLE
} from './types';
import { autoSignIn } from './users';

const BASE_URL = 'https://articles-196d0.firebaseio.com';

export const getArticles = (category, cb) => async dispatch => {
  try {
    let url = `${BASE_URL}/articles.json`;
    if (category !== 'All') {
      url = `${url}/?orderBy=\"category\"&equalTo=\"${category}\"`;
    }
    const { data } = await axios.get(url);
    const payload = [];
    for (const id in data) {
      payload.push({ ...data[id], id });
    }
    dispatch({ type: GET_ARTICLES, payload });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

const getToken = (dispatch, getState) => {
  const { refToken, expiration, token } = getState().user.userData;
  const now = new Date().getTime();
  if (expiration >= now) {
    return token;
  }
  return new Promise((resolve, reject) => {
    dispatch(
      autoSignIn(refToken, err => {
        if (err) {
          return reject(err);
        }
        resolve(getState().user.userData.token);
      })
    );
  });
};

export const deleteArticle = (id, cb) => async (dispatch, getState) => {
  try {
    const token = await getToken(dispatch, getState);
    const url = `${BASE_URL}/articles/${id}.json?auth=${token}`;
    await axios.delete(url);
    dispatch({ type: DELETE_ARTICLE, payload: true });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const addArticle = (input, cb) => async (dispatch, getState) => {
  try {
    const token = await getToken(dispatch, getState);
    const { uid } = getState().user.userData;
    const { data } = await axios.post(
      `${BASE_URL}/articles.json?auth=${token}`,
      { ...input, uid }
    );
    dispatch({ type: ADD_ARTICLE, payload: data });
    cb();
  } catch (err) {
    cb(err.response.data);
  }
};

export const resetArticle = () => ({ type: RESET_ARTICLE });
