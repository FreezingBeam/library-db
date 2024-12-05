const pool = require("../db");

class GenreController {
    async getAllGenres(req,res) {
        try {
            const genre = await pool.query("SELECT * FROM genres")
            res.send(genre.rows);
        }
        catch(error) {
            console.log("genreController error " + error);
        }
    }

    async createGenre(req,res) {
        const {genre} = req.body;
        try {
            const gen = await pool.query("INSERT INTO genres(genre) VALUES($1) RETURNING *", [genre])
            res.send(gen.rows);
        }
        catch(error) {
            console.log("genreController error " + error);
        }
    }

    async updateGenre(req,res) {
        const id = parseInt(req.params.id, 10);
        const {Genre} = req.body;
        try {
            const genre = await pool.query("UPDATE authors SET author = $1 WHERE id = $2", [Genre, id])
            res.send(genre.rows);
        }
        catch(error) {
            console.log("genreController error " + error);
        }
    }

    async deleteGenre(req,res) {
        const id = req.params.id
        try {
            const genre = await pool.query("DELETE FROM genres WHERE id = $1", [id]);
            res.send(genre.rows);
        }
        catch(error) {
            console.log("genreController error " + error);
        }
    }
}

module.exports = new GenreController();