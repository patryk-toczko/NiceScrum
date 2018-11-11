let ipc = require("electron").ipcRenderer,
  //$  = require('jquery'),
  User     = require("../models/user.js"),
  Project  = require("../models/project.js")
  mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test",
  { useNewUrlParser: true }
);

// When user-logged-in message is recieved fill in important data
ipc.on("user-logged-in", (event, user) => {
  $("#username").text(user._doc.name);
  $("#numProjects").text(user._doc.projects.length);
  accountSettingsRender(user);
  accountProjectsRender(user);
  // Populate the new project members dropdown menu
  populateDropdown();
});

// Allow for tabbing of main page to function
$(".menu .item").tab();

//Allow for dropdown menus to work
$(".ui.dropdown").dropdown();


// Handle creating a new project
$("#newProjectSubmit").on("click", () => {
  var projectName        = $('#projectNameInput').val();
  var projectDescription = $('#projectDescriptionInput').val();
  var members            = $("#memberSelect").val();


  if(projectName.length===0 || projectDescription.length===0 || members.length===0){
    console.log("Fields are empty");
    $('#newProjectValidation').text('Make sure all fields are filled out');
  } else {
    var newProject = {name: projectName, description: projectDescription, members: members};

    Project.create(newProject, function(err, project){
      if(err){
        throw err;
      } else {
        console.log("added a project");
        project.save();

        members.forEach(member => {
          console.log(member);
          User.updateOne({userName: member}, {$push: {projects: project}}, (err, user) => {
            if(err){
              console.log(err);
            } else {
              $("#numProjects").text(user._doc.projects.length);
            }
          });
        });
        $('#projectList').append(
          `<div id="` + project.id + `" class="item" onclick="projectClicked(this)">
            <img class="ui avatar image" src="`+ project.icon +`">
            <div class="content">
              <a class="header">` + project.name + `</a>
              <div class="description"> Date added: `+ project.dateAdded.toDateString() + `</div>
            </div>
          </div>`
        );
      }
    });
    $('#newProjectForm')[0].reset();
    $('#newProjectValidation').text('Project has been successfully added');
  } 
});

function populateDropdown() {
  memberSelect = document.getElementById("memberSelect");
  teamLeader   = document.getElementById("teamLeader");
  User.find({}, (err, users) => {
    if (err)
      throw err;
    else {
      users.forEach(user => {
        memberSelect.options.add(new Option(user.name, user.userName));
        teamLeader.options.add(new Option(user.name, user.userName));
      });
    }
  });
}

// Renders account settings in the accound settings tab
function accountSettingsRender(user) {
  $('#accountImage').attr('src', user._doc.image);
  $('#accountName').html(user._doc.name);
  $('#accountUser').append(user._doc.userName);
}

function accountProjectsRender(user) {
  //console.log(user);
  User.findOne({userName: user._doc.userName}).populate("projects").exec(function (err, newUser) {
    if(err){
      throw err;
    } else {
      newUser.projects.forEach(project => {
        $('#projectList').append(
          `<div id="` + project.id + `" class="item" onclick="projectClicked(this)">
            <img class="ui avatar image" src="`+ project.icon +`">
            <div class="content">
              <a class="header">` + project.name + `</a>
              <div class="description"> Date added: `+ project.dateAdded.toDateString() + `</div>
            </div>
          </div>`
        );
      });
    }
  });
}

function projectClicked(obj){
  var id = obj.id;
  Project.findById(id, (err, project) => {
    if(err){
      console.log(err);
    } else {
      ipc.send('get-project-page', project);

    }
  });
}