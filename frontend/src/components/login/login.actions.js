import loginApi from '../../api/login.api';

const loginStart = () => ({
  type: 'LOGIN_START',
});

const loginSuccessful = token => ({
  type: 'LOGIN_SUCCESSFUL',
  payload: {
    token,
  }
});

const loginEnd = () => ({
  type: 'LOGIN_END',
});

export const login = (login, password, rememberMe) => (dispatch) => {
  dispatch(loginStart());
  return loginApi().login(login, password, rememberMe).then(jwt => {
    dispatch(loginSuccessful(jwt))
  })
  .finally(() => {
    dispatch(loginEnd());
  });
};