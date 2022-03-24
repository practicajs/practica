"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelizeConfig = require("./config/config");
let repository;
let orderModel;
class OrderRepository {
    constructor() {
        if (!repository) {
            repository = new Sequelize("shop", "myuser", "myuserpassword", sequelizeConfig);
            orderModel = repository.define("Order", {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                externalIdentifier: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: true,
                },
                mode: {
                    type: Sequelize.STRING,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                productId: {
                    type: Sequelize.INTEGER,
                },
            });
        }
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderModel.findOne({ where: { id } });
        });
    }
    addOrder(orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const addingResponse = yield orderModel.create(orderDetails);
            return addingResponse.dataValues;
        });
    }
    deleteOrder(orderToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderModel.destroy({ where: { id: orderToDelete } });
            return;
        });
    }
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderModel.truncate();
        });
    }
}
exports.default = OrderRepository;
