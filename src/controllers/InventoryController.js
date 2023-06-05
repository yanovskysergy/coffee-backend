const InventoryModel = require("../models/InventoryModel");
const ProductModel = require("../models/ProductModel");
const { sendBasicError } = require("../helpers/helpers");

module.exports.getInventory = async (_, res) => {
  try {
    const inventory = await InventoryModel.find();
    res.json(inventory);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryItem = await InventoryModel.findById(id);
    res.json(inventoryItem);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.createInventory = async (req, res) => {
  try {
    const { name } = req.body;
    const inventoryItem = await InventoryModel.create({ name });
    res.json(inventoryItem);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const inventoryItem = await InventoryModel.findByIdAndUpdate(
      id, 
      { ...(name ? { name } : null) },
      { new: true }
    );
    res.json(inventoryItem);
  } catch (e) {
    sendBasicError(res, e);
  }
};

module.exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await ProductModel.find();
    const dependentProductIds = products
      .filter(({ inventory }) => !!inventory.find(({ _id }) => _id.equals(id)))
      .map(({ _id }) => ({ _id }));

    if (dependentProductIds.length) {
      res.status(405).json({
        message: `Inventory wasn't deleted cause inventory with id ${id} uses in one or a few products`,
        dependentProductIds
      });
      return;
    }

    const inventoryItem = await InventoryModel.findByIdAndDelete(id);
    res.json(inventoryItem);
  } catch (e) {
    sendBasicError(res, e);
  }
};
