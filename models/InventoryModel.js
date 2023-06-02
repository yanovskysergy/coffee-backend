const { Schema, model } = require("mongoose");

const inventorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamp: true }
);

const InventoryModel = model("Inventory", inventorySchema);

module.exports = InventoryModel;
