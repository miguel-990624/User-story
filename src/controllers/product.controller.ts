import { type Request, type Response } from "express";
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../services/product.services.ts";

// GET all products
const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error("❌ Error in getProductsController:", error);
    res.status(500).send("Error fetching products");
  }
};

// GET product by ID
const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = Number(id);

  if (!id || isNaN(productId)) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const product = await getProductById(productId);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    console.error("❌ Error in getProductByIdController:", error);
    res.status(500).send("Error fetching product");
  }
};

// POST create product
const postProductController = async (req: Request, res: Response) => {
  try {
    // Validación mínima del body
    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).send("Name is required and must be a string");
    }
    if (!req.body.price || typeof req.body.price !== "number") {
      return res.status(400).send("Price is required and must be a number");
    }

    const product = await postProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Error in postProductController:", error);
    res.status(500).send("Error creating product");
  }
};

// PUT update product
const putProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = Number(id);

  if (!id || isNaN(productId)) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const product = await putProduct(productId, req.body);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    console.error("❌ Error in putProductController:", error);
    res.status(500).send("Error updating product");
  }
};

// DELETE product
const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = Number(id);

  if (!id || isNaN(productId)) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const deleted = await deleteProduct(productId);
    if (!deleted) return res.status(404).send("Product not found");
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error in deleteProductController:", error);
    res.status(500).send("Error deleting product");
  }
};

export { getProductsController, getProductByIdController, postProductController, putProductController, deleteProductController };
