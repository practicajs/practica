import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { getCountryModel } from './country-model';
import getDbConnection from './db-connection';

export interface OrderModelFields
  extends Model<
    InferAttributes<OrderModelFields>,
    InferCreationAttributes<OrderModelFields>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  deliveryAddress: string;
  countryId: number;
  userId: number;
  productId: number;
  paymentTermsInDays: number;
}

export function getOrderModel() {
  const orderModel = getDbConnection().define<OrderModelFields>(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      countryId: {
        type: DataTypes.INTEGER,
      },
      paymentTermsInDays: {
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );

  orderModel.belongsTo(getCountryModel(), {
    foreignKey: {
      name: 'countryId',
    },
  });

  return orderModel;
}
