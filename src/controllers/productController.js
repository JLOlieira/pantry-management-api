import Product from "../models/Product.js";
import Group from "../models/Group.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
  console.log(products);
};

// Criar um novo produto na lista do grupo, o groupId é passado no corpo da requisição
export const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body });
  await Group.updateOne(
    { _id: req.body.group },
    { $push: { products: product._id } },
  );
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produto deletado" });
};
