
import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/modules.index';

let store;
const initialState={}

store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
