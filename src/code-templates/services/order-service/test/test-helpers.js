"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = void 0;
const axios = require("axios");
const getAxiosInstance = (address) => {
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${address.port}`,
    Headers: {
      "content-type": "application/json",
      authorization: "Bearer...",
    },
  };
  return axios.create(axiosConfig);
};
exports.getAxiosInstance = getAxiosInstance;
