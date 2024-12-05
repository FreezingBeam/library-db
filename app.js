const express = require("express");
const createTable = require("./db/setup");
const pool = require("./db/index");

const userRouter = require("./Routes/userRouter");
const authorRouter = require("./Routes/authorRouter");
const genreRouter = require("./Routes/genreRouter");
const bookRouter = require("./Routes/bookRouter");
const statusRouter = require("./Routes/statusRouter");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", authorRouter);
app.use("/api", genreRouter);
app.use("/api", bookRouter);
app.use("/api", statusRouter);

async function initializeApp() {
    try {
        await createTable(pool);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(error) {
        console.error("Error initializing app: ", error.message);
    }
}

initializeApp();