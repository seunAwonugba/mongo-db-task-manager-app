const express = require("express");
const { router } = require("./router/router");
const app = express();
const host = "localhost";
const port = process.env.PORT || 8080;
const { connectDataBase } = require("./db/connect");
require("dotenv").config();
const { resourceNotFound } = require("./middleware/resourceNotFound");
const { errorHandler } = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/tasks", router);
app.use(resourceNotFound);
app.use(errorHandler);

const startServer = async (connectionString) => {
    try {
        await connectDataBase(connectionString);
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer(process.env.MONGO_DB_CONNECTION_STRING);
