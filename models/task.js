var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
    task       : String,
    type       : String,
    description: String,
    assignedTo : {type: String, default: "unassigned"}
});

module.exports = mongoose.model("Task", taskSchema);