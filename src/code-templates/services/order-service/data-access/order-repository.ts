import Sequelize from "sequelize";
import sequelizeConfig from "./config/config";
import { configurationProvider } from "../../../libraries/configuration-provider/index";

let repository;
let orderModel;

export default class OrderRepository {
  constructor() {
    if (!repository) {
      repository = new Sequelize(
        configurationProvider.get("DB.dbName"),
        configurationProvider.get("DB.userName"),
        configurationProvider.get("DB.password"),
        sequelizeConfig
      );
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

  async getOrderById(id) {
    return await orderModel.findOne({ where: { id } });
  }

  async addOrder(orderDetails) {
    const addingResponse = await orderModel.create(orderDetails);

    return addingResponse.dataValues;
  }

  async deleteOrder(orderToDelete) {
    await orderModel.destroy({ where: { id: orderToDelete } });
    return;
  }

  async cleanup() {
    await orderModel.truncate();
  }
}
