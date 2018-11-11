var mongoose = require("mongoose");

var storySchema = mongoose.Schema({
    name       : String,
    description: String,
    completed  : Boolean
});

module.exports = mongoose.model("Story", storySchema);