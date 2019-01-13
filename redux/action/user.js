export const USER_DATA  = 'USER_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

export const setUserData = data => ({
  type: USER_DATA,
  data,
});
export const clearUserData = () => ({
  type: CLEAR_DATA,
});

const initialState = {
  token: '',
  isLogin: false
};

export default (state = initialState, action) => {
  let login = action.token == '';
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        ...action.data,
        isLogin: !login
      };
    case CLEAR_DATA:
      return {
        token: '',
        isLogin: false
      };
    default:
      return state;
  }
};

global.setUserData = setUserData;
global.clearUserData = clearUserData;
