import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.ts";


interface OrderProductAttributes {
  order_id: number;
  product_id: number;
  amount: number;
}

class OrderProduct extends Model<OrderProductAttributes> implements OrderProductAttributes {
  declare order_id: number;
  declare product_id: number;
  declare amount: number;
}

OrderProduct.init(
  {
    order_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    amount: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  },
  {
    sequelize,
    tableName: "order_products",
    timestamps: false,
  }
);

export { OrderProduct, type OrderProductAttributes };
