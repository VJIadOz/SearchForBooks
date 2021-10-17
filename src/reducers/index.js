import { combineReducers } from "redux";
import listReducer from "./listReducer.js";
import totalItemsReducer from "./totalItemsReducer.js";
import stateLoadingReducer from "./stateLoadingReducer.js";
import searchParametersReducer from "./searchParametersReducer.js";
import stateLoadingPictureReducer from "./stateLoadingPictureReducer.js";
import stateMainContent from "./stateMainContent.js"
import selfLinkCurrentBookReducer from "./selfLinkCurrentBookReducer.js"

export default combineReducers({
    listReducer,
    totalItemsReducer,
    stateLoadingReducer,
    searchParametersReducer,
    stateLoadingPictureReducer,
    stateMainContent,
    selfLinkCurrentBookReducer
});