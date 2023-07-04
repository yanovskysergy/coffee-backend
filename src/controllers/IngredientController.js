const IngredientModel = require("../models/IngredientModel");
const ProductModel = require("../models/ProductModel");
const { sendBasicError } = require("../helpers/helpers");
const { INGREDIENT_IS_USED_IN_PRODUCT } = require("../contants");

module.exports.getIngredient = async (_, res) => {
  try {
    const ingredient = await IngredientModel.find();
    res.json(ingredient);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.getIngredientItem = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await IngredientModel.findById(id);
    res.json(ingredient);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.createIngredient = async (req, res) => {
  try {
    const { name, unit } = req.body;
    const ingredient = await IngredientModel.create({ name, unit });
    res.json(ingredient);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit } = req.body;

    const products = await ProductModel.find();
    const dependentProducts = products
      .filter(({ ingredient }) => !!ingredient.find(({ _id }) => _id.equals(id)))

    if (dependentProducts.length) {
      res.status(405).json({
        message: `Ingredient wasn't edited cause ingredient with id ${id} uses in one or a few products`,
        dependentProducts,
        errorKey: INGREDIENT_IS_USED_IN_PRODUCT
      });
      return;
    }

    const ingredient = await IngredientModel.findByIdAndUpdate(
      id,
      {
        ...(name ? { name } : null),
        ...(unit ? { unit } : null),
      },
      { new: true }
    );
    res.json(ingredient);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await ProductModel.find();
    const dependentProducts = products
      .filter(({ ingredient }) => !!ingredient.find(({ _id }) => _id.equals(id)))

    if (dependentProducts.length) {
      res.status(405).json({
        message: `Ingredient wasn't deleted cause ingredient with id ${id} uses in one or a few products`,
        dependentProducts,
        errorKey: INGREDIENT_IS_USED_IN_PRODUCT
      });
      return;
    }

    const ingredient = await IngredientModel.findByIdAndDelete(id);
    res.json(ingredient);
  } catch (e) {
    sendBasicError(res, e);
  }
};
