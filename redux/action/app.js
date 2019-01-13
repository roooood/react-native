export const APP_INFO = 'APP_INFO';

export const setAppData = object => ({
  type: APP_INFO,
  data: object,
});

const initialState = {

};

export default (state = initialState, action) => {

  switch (action.type) {
    case APP_INFO:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};


global.setAppData = setAppData;
