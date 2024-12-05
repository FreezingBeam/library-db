const pool = require("../db");

class StatusController {
    async getAllStatus(req,res) {
        try {
            const stat = await pool.query("SELECT * FROM status");
            res.send(stat.rows);
        }
        catch(error) {
            console.log("statusController error " + error);
        }
    }

    async getBookStatus(req,res) {
        const book_id = req.params.id
        try {
            const stat = await pool.query("SELECT status FROM status WHERE book_id = $1", [book_id]);
            res.send(stat)
        }
        catch(error) {
            console.log("statusController error " + error);
        }
    }

    async createRentOnBook(req,res) {
        const {book_id, status} = req.body;
        try {
            const stat = await pool.query("INSERT INTO status(book_id, status) VALUES($1, $2) RETURNING *", [book_id, status]);
            res.send(stat.rows);
        }
        catch(error) {
            console.log("statusController error " + error);
        }
    }

    async endRentOnBook(req,res) {
        const book_id = req.params.id;
        const {rent_end} = req.body;
        try {
            const stat = await pool.query("UPDATE status SET rent_end = $1 WHERE book_id = $2 RETURNING *", [rent_end, book_id]);
            res.send(stat.rows);
        }
        catch(error) {
            console.log("statusController error " + error);
        }
    }

    async deleteStatus(req,res) {
        const book_id = req.params.id
        try {
            const stat = await pool.query("DELETE FROM status WHERE book_id = $1", [book_id]);
            res.send(stat.rows);
        }
        catch(error) {
            console.log("statusController error " + error);
        }
    }
}

module.exports = new StatusController();