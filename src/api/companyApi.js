import axios from 'axios';


export default {
  // api to get companies
  getCompanies: (params) =>
    axios.get(`https://market-fake-server.herokuapp.com/companies`, params
    ).then(result => {
      return result;
    }).catch(function (error) {
      console.log(error);
    }),
};
