const pool = require("../db");

class BookController {
    async getAllBooks(req,res) {
        try {
            const book = await pool.query("SELECT * FROM books");
            res.send(book.rows);
        }
        catch(error) {
            console.log("bookController error " + error);
        }
    }

    async createBook(req,res) {
        const {title, author_id, genre_id} = req.body;
        try {
            const book = await pool.query("INSERT INTO books(title, author_id, genre_id) VALUES($1, $2, $3) RETURNING *", [title, author_id, genre_id]);
            res.send(book.rows)
        }
        catch(error) {
            console.log("bookController error " + error);
        }
    }

    async updateBook(req,res) {
        const id = req.params.id;
        const {title, author_id, genre_id} = req.body;
        try {
            const book = await pool.query("UPDATE books SET title = $1, author_id = $2, genre_id = $3 WHERE id = $4", [title, author_id, genre_id, id])
            res.send(book.rows);
        }
        catch(error) {
            console.log("bookController error " + error);
        }
    }

    async deleteBook(req,res) {
        const id = req.params.id
        try {
            const book = await pool.query("DELETE FROM books WHERE id = $1", [id]);
            res.send(book.rows);
        }
        catch(error) {
            console.log("bookController error " + error);
        }
    }
}

module.exports = new BookController();