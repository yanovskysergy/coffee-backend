const { Router } = require("express");
const {
  createProduct,
  getProduct,
  getProductItem,
  updateProduct,
  deleteProduct
} = require("../controllers/ProductController");

const router = Router();

router.post("/product", createProduct);
router.get("/product", getProduct);
router.get("/product/:id", getProductItem);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct)

module.exports = router;
