import { combineReducers } from "redux";

import user from "./user";
import app from "./app";
import reg from "./reg";
import infoProfile from "./infoProfile";

export default combineReducers({
  app,
  user,
  reg,
  infoProfile
});
