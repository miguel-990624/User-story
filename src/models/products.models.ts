import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
}

type ProductCreation = Optional<ProductAttributes, "id">;

class Product extends Model<ProductAttributes, ProductCreation> {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);

export { Product, type ProductAttributes, type ProductCreation };
