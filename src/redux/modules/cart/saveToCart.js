import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import cartApi from '../../../api/cartApi';
import { SAVE_TO_CART_REQUEST, SAVE_TO_CART_SUCCESS, SAVE_TO_CART_FAILURE } from '../../types';

// Reducer
export default createReducer({
  mapActionToKey: action => action.type,
  types: [SAVE_TO_CART_REQUEST, SAVE_TO_CART_SUCCESS, SAVE_TO_CART_FAILURE],
});
// action to save to cart
export function saveToCart(data) {
  return dispatch => {
    dispatch(createDispatcher(SAVE_TO_CART_REQUEST));
    return cartApi
      .saveToCart(data)
      .then(res => {
        dispatch(createDispatcher(SAVE_TO_CART_SUCCESS, res.data));
        return res;
        
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher(SAVE_TO_CART_FAILURE, err.response));
        return err;
      });
  };
}
