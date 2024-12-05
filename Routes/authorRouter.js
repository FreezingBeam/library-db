const Router = require("express");
const router = new Router();
const authorController = require("../Conrollers/authorController");

router.get("/author", authorController.getAllAuthors);
router.post("/author", authorController.createAuthor);
router.put("/author/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);

module.exports = router;