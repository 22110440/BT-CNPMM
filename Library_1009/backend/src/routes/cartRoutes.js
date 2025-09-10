const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/", cartController.addItem);
router.put("/:id", cartController.updateItem);
router.delete("/:id", cartController.deleteItem);

module.exports = router;
