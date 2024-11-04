import { combineReducers } from 'redux';
import userReducer from "./Screen/LoginScreen/UserSlice"

const rootReducer = combineReducers({
  User: userReducer,
});

export default rootReducer;