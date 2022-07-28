import { DataTypes } from 'sequelize';
import getDbConnection from '../db-connection';

export default function getOrderModel() {
  return getDbConnection().define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalIdentifier: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    paymentTermsInDays: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  });
}
