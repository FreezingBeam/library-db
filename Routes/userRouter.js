const Router = require("express");
const router = new Router();
const userController = require("../Conrollers/userController");

router.get("/user", userController.getAllUsers);
router.post("/user", userController.createUser);
router.put("/user/book/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;