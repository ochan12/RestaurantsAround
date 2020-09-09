import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import results from './reducers/resultsReducer';
import restaurantReducer from './reducers/restaurantReducer';

export default createStore(combineReducers({results,restaurantReducer}),{}, applyMiddleware(thunk))
