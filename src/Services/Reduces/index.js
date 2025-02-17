import { combineReducers } from "redux";
import {RecipeReduces} from "./RecipeReduces"
import { AuthReduces } from "./AuthReduces";

export const rootReducer=combineReducers({
  RecipeReduces,
  AuthReduces
})