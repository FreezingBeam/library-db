const pool = require("../db");

class AuthorController {
    async getAllAuthors(req,res) {
        try {
            const author = await pool.query("SELECT * FROM authors")
            res.send(author.rows);
        }
        catch(error) {
            console.log("authorController error " + error);
        }
    }

    async createAuthor(req,res) {
        const {name, surname} = req.body;
        try {
            const author = await pool.query("INSERT INTO authors(name, surname) VALUES($1, $2) RETURNING *", [name, surname])
            res.send(author.rows);
        }
        catch(error) {
            console.log("authorController error " + error);
        }
    }

    async updateAuthor(req,res) {
        const id = req.params.id;
        const {name, surname} = req.body;
        try {
            const author = await pool.query("UPDATE authors SET name = $1, surname = $2 WHERE id = $3", [name,surname, id])
            res.send(author.rows);
        }
        catch(error) {
            console.log("authorController error " + error);
        }
    }

    async deleteAuthor(req,res) {
        const id = req.params.id
        try {
            const author = await pool.query("DELETE FROM authors WHERE id = $1", [id]);
            res.send(author.rows);
        }
        catch(error) {
            console.log("authorController error " + error);
        }
    }
}

module.exports = new AuthorController();