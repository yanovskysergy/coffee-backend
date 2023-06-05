const ProductModel = require("../models/ProductModel");
const { sendBasicError } = require("../helpers/helpers");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, ingredient, inventory } = req.body;
    const product = await ProductModel.create({ name, ingredient, inventory });

    res.json(product);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.getProduct = async (_, res) => {
  try {
    const product = await ProductModel.find();
    res.json(product);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.getProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.json(product);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, inventory, ingredient } = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...(name ? { name } : null),
        ...(inventory ? { inventory } : null),
        ...(ingredient ? { ingredient } : null),
      },
      { new: true }
    );

    res.json(product);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    res.json(product);
  } catch (e) {
    sendBasicError(res, e);
  }
};
