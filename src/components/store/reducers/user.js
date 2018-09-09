import { REGISTER_USER, SIGNIN_USER, AUTO_SIGNIN } from '../actions/types';

const initialState = {
  userData: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
    case SIGNIN_USER:
    case AUTO_SIGNIN:
      return { ...state, userData: payload };
    default:
      return state;
  }
};
