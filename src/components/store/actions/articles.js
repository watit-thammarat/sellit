import axios from 'axios';

import { GET_ARTICLES } from './types';

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
