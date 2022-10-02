const { taskModel } = require("../db/models/tasks");

const getTasks = (req, res) => {
    res.status(200).json({
        success: true,
        data: "get tasks",
    });
};
const getTask = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.params.id,
    });
};

const postTasks = async (req, res) => {
    const createTask = await taskModel.create(req.body);
    res.status(200).json({
        success: true,
        data: createTask,
    });
};

const updateTask = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.body,
    });
};

const deleteTask = (req, res) => {
    res.status(200).json({
        success: true,
        data: "delete task",
    });
};

module.exports = { getTasks, postTasks, updateTask, deleteTask, getTask };
