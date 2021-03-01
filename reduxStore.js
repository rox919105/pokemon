import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import mainReducer from "./mainReducer";


const reducers = combineReducers ({
    mainPage: mainReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store