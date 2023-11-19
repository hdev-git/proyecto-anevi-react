import axios from "axios";
import { getToken, removeUser } from "./localuser";

const BASE_URL = "";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
      config.headers = {
        'Authorization': `${token}`,
        "Content-Type": "application/json",
      };
    } else {
      config.headers = {
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    //console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    //console.log(response);
    return response;
  },
  (error) => {
    // This function is part of a promise chain.
    // It needs to return a value or another promise so the caller knows when it
    // has completed.

    // Pass all non 401s back to the caller.
    console.log(error);
    if (error.response.status !== 401) {
      return Promise.reject(error);
    } else {
      console.log(error.response);
      removeUser();

      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
);

export default instance;
