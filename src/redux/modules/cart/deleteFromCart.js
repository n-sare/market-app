import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import cartApi from '../../../api/cartApi';
import { DELETE_FROM_CART_REQUEST, DELETE_FROM_CART_SUCCESS, DELETE_FROM_CART_FAILURE } from '../../types';

// Reducer which is defined in utils
export default createReducer({
  mapActionToKey: action => action.type,
  types: [DELETE_FROM_CART_REQUEST, DELETE_FROM_CART_SUCCESS, DELETE_FROM_CART_FAILURE],
});

// action to delete from cart
export function deleteFromCart(cartId) {
  return dispatch => {
    dispatch(createDispatcher(DELETE_FROM_CART_REQUEST));
    return cartApi
      .deleteFromCart(cartId)
      .then(res => {
        dispatch(createDispatcher(DELETE_FROM_CART_SUCCESS, res.data));
        return res;
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher(DELETE_FROM_CART_FAILURE, err.response));
        return err;
      });
  };
}
