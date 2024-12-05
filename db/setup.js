async function createTables(pool) {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
            )
        `;

        const createAuthorsTable = `
            CREATE TABLE IF NOT EXISTS authors(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                surname VARCHAR(100) NOT NULL
            )
        `;

        const createGenresTable = `
            CREATE TABLE IF NOT EXISTS genres(
                id SERIAL PRIMARY KEY,
                genre VARCHAR(100) NOT NULL
            )
        `;
        
        const createBooksTable = `
            CREATE TABLE IF NOT EXISTS books(
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                author_id INT REFERENCES authors(id) ON DELETE CASCADE,
                genre_id INT REFERENCES genres(id) ON DELETE CASCADE
            )
        `;

        const createStatusTable = `
            CREATE TABLE IF NOT EXISTS status(
                book_id INT REFERENCES books(id) ON DELETE CASCADE,
                status BOOLEAN NOT NULL,
                rent_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                rent_end TIMESTAMP DEFAULT NULL,
                user_id INT REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL
            )
        `;

        await pool.query(createUsersTable);
        console.log("Users table created!");

        await pool.query(createAuthorsTable);
        console.log("Authors table created!");
        
        await pool.query(createGenresTable)
        console.log("Genres table created!");

        await pool.query(createBooksTable)
        console.log("Books table created!");

        await pool.query(createStatusTable)
        console.log("Status table created!");
    }
    catch(error) {
        console.log("Error creating tables - " + error);
    }
}

module.exports = createTables;