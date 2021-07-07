import axios from 'axios';

export const axiosWithAuth = () => {

  return axios.create({
    baseURL: 'https://localhost:8000'

  });
};