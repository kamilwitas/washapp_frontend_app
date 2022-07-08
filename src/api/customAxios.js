import { message } from "antd";
import axios from "axios";

const customAxios = axios.create({
  baseURL: `https://aqualuxapp.azurewebsites.net/`,
  timeout: 150000,
});

const requestHandler = (request) => {
  const token = sessionStorage.getItem("accessToken");
  request.headers.Authorization = `Bearer ${`${token}`}`;
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  const originalConfig = error.config;
  if (error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;
    try {
      message.error("Twoja sesja wygasła, proszę się zalogować ponownie.");
      setTimeout(() => {
        window.location = "/login";
      }, 2000);
    }
    catch {

    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
