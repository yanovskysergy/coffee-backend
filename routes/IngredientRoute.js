const { Router } = require("express");
const {
  getIngredient,
  getIngredientItem,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} = require("../controllers/IngredientController");

const router = Router();

router.post("/ingredient", createIngredient);
router.get("/ingredient", getIngredient);
router.get("/ingredient/:id", getIngredientItem);
router.put("/ingredient/:id", updateIngredient);
router.delete("/ingredient/:id", deleteIngredient);

module.exports = router;
