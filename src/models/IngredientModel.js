const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    unit: {
      type: String,
      required: true,
      enum: { 
        values: ["GRAM", "MILLILITER", "COUNT"],
        message: "{VALUE} is not supported"
      },
    },
  },
  { timestamp: true }
);

const IngredientModel = model("Ingredient", ingredientSchema);

module.exports = IngredientModel;
