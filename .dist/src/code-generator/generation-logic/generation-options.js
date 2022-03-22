"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factorDefaultOptions = void 0;
var factorDefaultOptions = function (overrides) {
    var defaults = {
        appName: "default-app-name",
        baseFramework: "express",
        DBType: "pg",
        mainMicroserviceName: "microservice-example-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        installDependencies: false,
    };
    var result = Object.assign(defaults, overrides);
    return result;
};
exports.factorDefaultOptions = factorDefaultOptions;
