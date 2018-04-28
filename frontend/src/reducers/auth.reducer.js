import jwt from 'jsonwebtoken';

const extractToken = token => {
  if (token == null || token === '') {
    return null;
  }
  return JSON.parse(jwt.decode(token).sub);
};

const initialState = {
  token: extractToken(localStorage.getItem('pace__jwt_token')),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESSFUL": {
      localStorage.setItem('pace__jwt_token', action.payload.token);
      return {
        ...state,
        token: extractToken(action.payload.token),
      };
    }
    case "LOGOUT": {
      localStorage.removeItem('pace__jwt_token');
      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
}