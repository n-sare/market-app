import axios from 'axios';


export default {
  // api to get products to display
  getProducts: (params) =>
    axios.get(`/items`, params
    ).then(result => {
      return result;
    }).catch(function (error) {
      console.log(error);
    })
};
