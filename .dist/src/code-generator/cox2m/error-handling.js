"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.metricsExporter = exports.errorHandler = void 0;
var mailer = require("./libraries/mailer");
var logger = require("./libraries/logger");
// This file simulates real-world error handler that makes this component observable
var errorHandler = {
    handleError: function (errorToHandle) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    logger.error(errorToHandle);
                    metricsExporter.fireMetric("error", {
                        errorName: errorToHandle.name || "generic-error",
                    });
                    // This is used to simulate sending email to admin when an error occurs
                    // In real world - The right flow is sending alerts from the monitoring system
                    return [4 /*yield*/, mailer.send("Error occured", "Error is ".concat(errorToHandle), "admin@our-domain.io")];
                case 1:
                    // This is used to simulate sending email to admin when an error occurs
                    // In real world - The right flow is sending alerts from the monitoring system
                    _a.sent();
                    // A common best practice is to crash when an unknown error (non-trusted) is being thrown
                    decideWhetherToCrash(errorToHandle);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    // Continue the code flow if failed to handle the error
                    console.log("handleError threw an error ".concat(e_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.errorHandler = errorHandler;
var decideWhetherToCrash = function (error) {
    if (!error.isTrusted) {
        process.exit();
    }
};
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(name, message, HTTPStatus, isTrusted) {
        var _this = _super.call(this, message) || this;
        _this.HTTPStatus = HTTPStatus;
        _this.isTrusted = isTrusted;
        _this.name = name;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
var metricsExporter = {
    fireMetric: function (name, labels) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("In real production code I will really fire metrics");
            return [2 /*return*/];
        });
    }); },
};
exports.metricsExporter = metricsExporter;
