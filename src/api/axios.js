import axios from 'axios';
const instance = axios.create({baseURL: 'https://market-fake-server.herokuapp.com'});
export default instance