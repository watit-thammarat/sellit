import { GET_ARTICLES, ADD_ARTICLE, RESET_ARTICLE } from '../actions/types';

const initialState = {
  list: null,
  newArticle: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES:
      return { ...state, list: payload };
    case ADD_ARTICLE:
      return { ...state, newArticle: payload };
    case RESET_ARTICLE:
      return { ...state, newArticle: null };
    default:
      return state;
  }
};
