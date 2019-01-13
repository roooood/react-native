export const infoProfile = "infoProfile";

export const setInfoProfileData = data => ({
  type: infoProfile,
  data
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case infoProfile:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

global.setInfoProfileData = setInfoProfileData;
