import { Product } from "../models/products.models.ts";
import type { ProductCreation } from "../models/products.models.ts";

// GET all products
const getProducts = async (): Promise<Product[]> => {
  return await Product.findAll();
};

// GET product by ID
const getProductById = async (id: number): Promise<Product | null> => {
  return await Product.findByPk(id);
};

// POST create product
const postProduct = async (newProduct: ProductCreation): Promise<Product> => {
  const product = await Product.create(newProduct);
  return product;
};

// PUT update product
const putProduct = async ( id: number, updatedProduct: Partial<ProductCreation>): Promise<Product | null> => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  const updated = await product.update(updatedProduct);
  return updated;
};

// DELETE product
const deleteProduct = async (id: number): Promise<boolean> => {
  const product = await Product.findByPk(id);
  if (!product) return false;

  await Product.destroy({ where: { id } });
  return true;
};

export { getProducts, getProductById, postProduct, putProduct, deleteProduct };
