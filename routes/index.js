const { Router } = require("express");
const inventoryRoute = require("./InventoryRoute");
const ingredientRoute = require("./IngredientRoute");
const productRoute = require("./ProductRoute");

module.exports = (app) => {
  app.use(inventoryRoute);
  app.use(ingredientRoute);
  app.use(productRoute);

  const router = Router();
  ['get', 'put', 'post', 'delete'].forEach((req) => {
    app.use(router[req](
      "/*",
      (_, res) => res.status(500).json({ message: "endpoint is not exist" })
    ));
  })
}