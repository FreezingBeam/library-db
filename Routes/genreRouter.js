const Router = require("express");
const router = new Router();
const genreController = require("../Conrollers/genreController");

router.get("/genre", genreController.getAllGenres);
router.post("/genre", genreController.createGenre);
router.put("/genre/:id", genreController.updateGenre);
router.delete("/genre/:id", genreController.deleteGenre);

module.exports = router;