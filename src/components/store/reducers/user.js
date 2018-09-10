import {
  REGISTER_USER,
  SIGNIN_USER,
  AUTO_SIGNIN,
  GET_USER_POSTS,
  DELETE_ARTICLE
} from '../actions/types';

const initialState = {
  userData: null,
  userPosts: null,
  deletePost: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
    case SIGNIN_USER:
    case AUTO_SIGNIN:
      return { ...state, userData: payload };
    case GET_USER_POSTS:
      return { ...state, userPosts: payload };
    case DELETE_ARTICLE:
      return { ...state, deletePost: payload };
    default:
      return state;
  }
};
