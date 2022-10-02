const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"],
        trim: true,
        lowercase: true,
        maxlength: [20, "name's length cannot be more than 20"],
        minlength: [2, "name's length cannot be less than 2"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

//Task Model will be the name of ur model in mongo db web page
const taskModel = mongoose.model("Task Model", taskSchema);

module.exports = { taskModel };
