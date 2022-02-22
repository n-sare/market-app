import createDispatcher from '../../../utils/createDispatcher';
import createReducer from '../../../utils/createReducer';
import { message } from 'antd';
import companyApi from '../../../api/companyApi';
import { GET_COMPANIES_REQUEST, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE } from '../../types';

// Reducer
export default createReducer({
  mapActionToKey: action => action.type,
  types: [GET_COMPANIES_REQUEST, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE],
});
// action to get companies
export function getCompanies(params) {
  return dispatch => {
    dispatch(createDispatcher(GET_COMPANIES_REQUEST));
    return companyApi
      .getCompanies(params)
      .then(res => {
        dispatch(createDispatcher(GET_COMPANIES_SUCCESS, res.data));
        return res;
        
      })
      .catch(err => {
        message.error(err.message);
        dispatch(createDispatcher(GET_COMPANIES_FAILURE, err.response));
        return err;
      });
  };
}
