import { combineReducers } from 'redux';

/*Products*/
import getProductsResult from './modules/product/getProducts';

/*Companies*/
import getCompaniesResult from './modules/company/getCompanies';

/*Carts*/
import saveToCartResult from './modules/cart/saveToCart';
import updateCartResult from './modules/cart/updateCart';
import deleteFromCartResult from './modules/cart/deleteFromCart';
import getCartsResult from './modules/cart/getCarts';

export default combineReducers({
    getProductsResult,
    getCompaniesResult,
    saveToCartResult,
    updateCartResult,
    getCartsResult,
    deleteFromCartResult
})

/*This is where we combine reducers for all actions in project*/ 