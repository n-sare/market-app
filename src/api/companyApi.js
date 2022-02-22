import axios from './axios';


export default {
  // api to get companies
  getCompanies: (params) =>
    axios.get(`/companies`, params
    ).then(result => {
      return result;
    }).catch(function (error) {
      console.log(error);
    }),
};
