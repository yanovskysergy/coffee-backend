const { Router } = require("express");
const {
  getInventory,
  getInventoryItem,
  createInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/InventoryController");

const router = Router();

router.post("/inventory", createInventory);
router.get("/inventory", getInventory);
router.get("/inventory/:id", getInventoryItem);
router.put("/inventory/:id", updateInventory);
router.delete("/inventory/:id", deleteInventory);

module.exports = router;
