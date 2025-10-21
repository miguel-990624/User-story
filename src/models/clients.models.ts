import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

interface ClientAttributes {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

type ClientCreation = Optional<ClientAttributes, "id">;

class Client extends Model<ClientAttributes, ClientCreation> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone?: string;
}

Client.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: false,
  }
);

export { Client, type ClientAttributes, type ClientCreation };
