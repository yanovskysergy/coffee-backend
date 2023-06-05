const { Schema, model } = require("mongoose");
const Inventory = require("../models/InventoryModel");
const Ingredient = require("../models/IngredientModel");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredient: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "Ingredient",
            required: true,
            validate: {
              validator: async (indredientId) => {
                const ingredient = await Ingredient.findById(indredientId);
                return !!ingredient;
              },
              message: "Ingredient with id {VALUE} does not exist",
            },
          },
          value: { type: Number, required: true },
          optional: { type: Boolean, default: false },
        },
      ],
      required: true,
    },
    inventory: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "Inventory",
            required: true,
            validate: {
              validator: async (inventoryId) => {
                const inventory = await Inventory.findById(inventoryId);
                return !!inventory;
              },
              message: "Inventory with id {VALUE} does not exist",
            },
          },
          value: { type: Number, required: true },
          optional: { type: Boolean, default: false },
        },
      ],
      required: true,
    },
  },
  { timestamp: true }
);

const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
