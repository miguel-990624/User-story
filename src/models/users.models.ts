import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "analyst";
}

type UserCreation = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreation> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "admin" | "analyst";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "analyst"),
      allowNull: false,
      defaultValue: "analyst",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export { User, type UserAttributes, type UserCreation };
