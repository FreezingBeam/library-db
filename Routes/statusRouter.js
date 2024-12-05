const Router = require("express");
const router = new Router();
const statusController = require("../Conrollers/statusController");

router.get("/status", statusController.getAllStatus);
router.post("/status", statusController.createRentOnBook);
router.put("/status/:id", statusController.endRentOnBook);
router.delete("/status/:id", statusController.deleteStatus);

module.exports = router;