import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      // allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      // allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;
