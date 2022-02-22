import axios from 'axios';


export default {
  // api to get companies
  getCompanies: (params) =>
    axios.get(`http://localhost:3000/companies`, params
    ).then(result => {
      return result;
    }).catch(function (error) {
      console.log(error);
    }),
};
