var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
    name       : String,
    description: String,
    icon       : {type: String, default: 'https://image.flaticon.com/icons/svg/432/432435.svg'},
    dateAdded  : {type: Date, default: Date.now },
    tasks      : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Task"
    }],
    members: Array
});

module.exports = mongoose.model("Project", projectSchema);