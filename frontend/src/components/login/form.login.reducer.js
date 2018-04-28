const initialState = {
  loginFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loginFetching: true,
      };
    case "LOGIN_END":
      return {
        ...state,
        loginFetching: false,
      };
    default:
      return state;
  }
}