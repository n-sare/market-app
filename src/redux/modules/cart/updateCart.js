import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import cartApi from '../../../api/cartApi';
import { UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, UPDATE_CART_FAILURE } from '../../types';

// Reducer
export default createReducer({
  mapActionToKey: action => action.type,
  types: [UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, UPDATE_CART_FAILURE],
});
// action to update cart
export function updateCart(cartId, data) {
  return dispatch => {
    dispatch(createDispatcher(UPDATE_CART_REQUEST));
    return cartApi
      .updateCart(cartId, data)
      .then(res => {
        dispatch(createDispatcher(UPDATE_CART_SUCCESS, res.data));
        return res;
        
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher(UPDATE_CART_FAILURE, err.response));
        return err;
      });
  };
}
