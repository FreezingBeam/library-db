const pool = require("../db");

class UserController {
    async getAllUsers(req,res) {
        try {
            const user = await pool.query("SELECT * FROM users");
            res.send(user.rows);
        }
        catch(error) {
            console.log("userController error " + error);
        }
    }

    async createUser(req,res) {
        const {name, email, password} = req.body;
        try {
            const user = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, password]);
            res.send(user.rows);
        }
        catch(error) {
            console.log("userController error " + error);
        }
    }

    async updateUser(req,res) {
        const id = parseInt(req.params.id, 10);
        const {name, email, password} = req.body;
        try {
            const user = await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
        }
        catch(error) {
            console.log("userController error " + error);
        }
    }

    async deleteUser(req,res) {
        const id = req.params.id
        try {
            const user = await pool.query("DELETE FROM user WHERE id = $1", [id]);
            res.send(user.rows);
        }
        catch(error) {
            console.log("userController error " + error);
        }
    }
}

module.exports = new UserController();