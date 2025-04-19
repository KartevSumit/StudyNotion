import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, body, header, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: body ? body : null,
    headers: header ? header : null,
    params: params ? params : null,
  }).catch((error) => {
    throw error;
  });
};
