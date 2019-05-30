import axios from 'axios';

/*
  avoid declaring the fixed url
  in a team, every developer might access different mock data from the API

  consider its flexibility, add a custom environment variable
  reference: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
*/
const api = process.env.REACT_APP_DATA_API_URL || "https://5ced42a6b779120014b49f8b.mockapi.io"

// utilize axios to send a GET request to the API
export const getAll = () =>
  axios.get(`${api}/api/v1/records`);

// create data, utilize axios to send a POST request to the API
export const create = (body) =>
  axios.post(`${api}/api/v1/records`, body);

// update data
export const update = (id, body) =>
  axios.put(`${api}/api/v1/records/${id}`, body);

// delete data
export const remove = (id) =>
  axios.delete(`${api}/api/v1/records/${id}`);  