import { GET_ARTICLES } from '../actions/types';

const initialState = {
  list: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES:
      return { ...state, list: payload };
    default:
      return state;
  }
};
