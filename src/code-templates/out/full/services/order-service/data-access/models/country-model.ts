import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import getDbConnection from './db-connection';

export interface CountryModelFields
  extends Model<
    InferAttributes<CountryModelFields>,
    InferCreationAttributes<CountryModelFields>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
}

export function getCountryModel() {
  return getDbConnection().define<CountryModelFields>(
    'Country',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
}
