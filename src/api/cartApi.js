import axios from 'axios';


export default {
  // api to save product that doesnt exist in cart
  saveToCart: (data) =>
    axios.post(`https://market-fake-server.herokuapp.com/carts`, data
    ).then(result => {
      return result;
    }).catch(function (error) {
        console.log(error);
    }),
  // api to add more of same product that exist in cart or removing (not deleting)
  updateCart: (cartId, data) =>
    axios.put(`https://market-fake-server.herokuapp.com/carts/${cartId}`, data
    ).then(result => {
      return result;
    }).catch(function (error) {
        console.log(error);
    }),
  // api to delete product from cart (if product count is equal to 1)
  deleteFromCart: (cartId) =>
    axios.delete(`https://market-fake-server.herokuapp.com/carts/${cartId}`
    ).then(result => {
      return result;
    }).catch(function (error) {
        console.log(error);
    }),
  // api to get all carts to display
  getCarts: () =>
    axios.get(`https://market-fake-server.herokuapp.com/carts`
    ).then(result => {
      return result;
    }).catch(function (error) {
      console.log(error);
    }),
};
