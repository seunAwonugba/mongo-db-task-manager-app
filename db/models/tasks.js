const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task cannot be empty"],
        trim: true,
        lowercase: true,
        minlength: [2, "Task's length cannot be less than 2"],
        lowercase: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

//Task Model will be the name of ur model in mongo db web page
const taskModel = mongoose.model("Task Model", taskSchema);

module.exports = { taskModel };
