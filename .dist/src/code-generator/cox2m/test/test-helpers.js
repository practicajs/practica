"use strict";
var axios = require('axios');
module.exports.getAxiosInstance = function (address) {
    var axiosConfig = {
        baseURL: "http://127.0.0.1:".concat(address.port),
        Headers: {
            'content-type': 'application/json',
            authorization: 'Bearer...',
        },
    };
    return axios.create(axiosConfig);
};
