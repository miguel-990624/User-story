import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

interface OrderAttributes {
  id: number;
  client_id: number;
  createdAt?: Date;
}

type OrderCreation = Optional<OrderAttributes, "id" | "createdAt">;

class Order extends Model<OrderAttributes, OrderCreation> implements OrderAttributes {
  declare id: number;
  declare client_id: number;
  declare createdAt?: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: false,
  }
);

export { Order, type OrderAttributes, type OrderCreation };
