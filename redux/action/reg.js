export const REG = 'REG';

export const setRegData = data => ({
  type: REG,
  data,
});

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REG:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

global.setRegData = setRegData;
