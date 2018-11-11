let ipc = require("electron").ipcRenderer,
  //$  = require('jquery'),
  User     = require("../models/user.js"),
  Project  = require("../models/project.js")
  mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test",
  { useNewUrlParser: true }
);

ipc.on('show-project-page', (event, project) => {
    //console.log(project);
    $('#name').text("Project Title:" + project._doc.name);
});