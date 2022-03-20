"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = void 0;
var axios = require("axios");
var getAxiosInstance = function (address) {
    var axiosConfig = {
        baseURL: "http://127.0.0.1:".concat(address.port),
        Headers: {
            "content-type": "application/json",
            authorization: "Bearer...",
        },
    };
    return axios.create(axiosConfig);
};
exports.getAxiosInstance = getAxiosInstance;
