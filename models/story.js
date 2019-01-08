var mongoose = require("mongoose");

var storySchema = mongoose.Schema({
    name       : String,
    description: String,
    assignedTo : String
});

module.exports = mongoose.model("Story", storySchema);