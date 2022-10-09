const { taskModel } = require("../db/models/tasks");
const { asyncWrapper } = require("../middleware/async-wrapper");
const { create404ErrorMessage } = require("../errors/Custom404Error");

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await taskModel.find({});
    res.status(200).json({
        success: true,
        data: tasks,
    });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const getTask = await taskModel.findById(id);

    if (getTask) {
        return res.status(200).json({
            success: true,
            data: getTask,
        });
    } else {
        return next(create404ErrorMessage("Resource not found", 404));
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
    console.log(id);

    const updateTask = await taskModel.findByIdAndUpdate(id, body, options);

    if (updateTask) {
        return res.status(200).json({
            success: true,
            data: updateTask,
        });
    } else {
        return next(create404ErrorMessage("Resource not found", 404));
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
        return next(create404ErrorMessage("Resource not found", 404));
    }
});

module.exports = { getTasks, postTasks, updateTask, deleteTask, getTask };
