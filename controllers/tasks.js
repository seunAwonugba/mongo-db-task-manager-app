const { taskModel } = require("../db/models/tasks");
const { asyncWrapper } = require("../middleware/async");

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await taskModel.find({});
    res.status(200).json({
        success: true,
        data: tasks,
    });
});

const getTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const getTask = await taskModel.findById(id);

    if (getTask) {
        return res.status(200).json({
            success: true,
            data: getTask,
        });
    } else {
        return res.status(404).json({
            success: false,
            data: "Resource not found",
        });
    }
});

const postTasks = asyncWrapper(async (req, res) => {
    const createTask = await taskModel.create(req.body);
    res.status(200).json({
        success: true,
        data: createTask,
    });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const options = {
        new: true,
        runValidators: true,
        overwrite: true,
    };

    const updateTask = await taskModel.findByIdAndUpdate(id, body, options);

    if (updateTask) {
        return res.status(200).json({
            success: true,
            data: updateTask,
        });
    } else {
        res.status(404).json({
            success: false,
            data: "Resource not found",
        });
        return;
    }
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deleteTask = await taskModel.findByIdAndDelete(id);

    if (deleteTask) {
        return res.status(200).json({
            success: true,
            data: `Task ${deleteTask.name} deleted successfully`,
        });
    } else {
        return res.status(404).json({
            success: true,
            data: "Resource not found",
        });
    }
});

module.exports = { getTasks, postTasks, updateTask, deleteTask, getTask };
