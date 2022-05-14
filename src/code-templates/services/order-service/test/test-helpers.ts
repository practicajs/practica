import axios from "axios";

export const getAxiosInstance = (address) => {
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${address.port}`,
    Headers: {
      "content-type": "application/json",
      authorization: "Bearer...",
    },
  };

  return axios.create(axiosConfig);
};
