"use strict";
// This is not a real logger as its just writes to the console
// but it has the structure of a real logger
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = void 0;
var info = function (message) {
    console.log(message);
};
exports.info = info;
var error = function (message) {
    console.error(message);
};
exports.error = error;
