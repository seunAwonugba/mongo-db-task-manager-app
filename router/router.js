const express = require("express");
const router = express.Router();
const {
    getTasks,
    postTasks,
    updateTask,
    deleteTask,
    getTask,
} = require("../controllers/tasks");

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", postTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = { router };
