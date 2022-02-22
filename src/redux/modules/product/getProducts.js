import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import productApi from '../../../api/productApi';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../../types';

// Reducer
export default createReducer({
  mapActionToKey: action => action.type,
  types: [GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE],
});

// action to get products
export function getProducts(params) {
  return dispatch => {
    dispatch(createDispatcher(GET_PRODUCTS_REQUEST));
    return productApi
      .getProducts(params)
      .then(res => {
        dispatch(createDispatcher(GET_PRODUCTS_SUCCESS, res.data));
        return res;
        
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher(GET_PRODUCTS_FAILURE, err.response));
        return err;
      });
  };
}
