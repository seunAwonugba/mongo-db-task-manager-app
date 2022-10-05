const { taskModel } = require("../db/models/tasks");

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err,
        });
    }
};
const getTask = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err,
        });
    }
};

const postTasks = async (req, res) => {
    try {
        const createTask = await taskModel.create(req.body);
        res.status(200).json({
            success: true,
            data: createTask,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err,
        });
    }
};

const updateTask = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err,
        });
    }
};

const deleteTask = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            success: true,
            data: err,
        });
    }
};

module.exports = { getTasks, postTasks, updateTask, deleteTask, getTask };
