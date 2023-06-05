const { Router } = require("express");
const mongoose = require('mongoose');
const inventoryRoute = require("./InventoryRoute");
const ingredientRoute = require("./IngredientRoute");
const productRoute = require("./ProductRoute");

const configRoute = Router();

configRoute.put('/update-mongo', async (req, res) => {
  const { mongoKey } = req.body;
  try {
    await mongoose.connect(mongoKey);
    res.status(200).json({ message: "Successfull update mongo key" })
  } catch (e) {
    res.status(500).json({ message: "Error when tried update mongo key", details: e })
  }
})

module.exports = (app) => {
  app.use(inventoryRoute);
  app.use(ingredientRoute);
  app.use(productRoute);
  app.use(configRoute);

  const router = Router();
  ['get', 'put', 'post', 'delete'].forEach((req) => {
    app.use(router[req](
      "/*",
      (_, res) => res.status(500).json({ message: "endpoint is not exist" })
    ));
  })
}