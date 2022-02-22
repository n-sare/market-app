import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import cartApi from '../../../api/cartApi';
import {  GET_CARTS_REQUEST,  GET_CARTS_SUCCESS,  GET_CARTS_FAILURE } from '../../types';

// Reducer
export default createReducer({
  mapActionToKey: action => action.type,
  types: [ GET_CARTS_REQUEST,  GET_CARTS_SUCCESS,  GET_CARTS_FAILURE],
});

// action to get carts
export function getCarts() {
  return dispatch => {
    dispatch(createDispatcher( GET_CARTS_REQUEST));
    return cartApi
      .getCarts()
      .then(res => {
        dispatch(createDispatcher( GET_CARTS_SUCCESS, res.data));
        return res;
        
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher( GET_CARTS_FAILURE, err.response));
        return err;
      });
  };
}
