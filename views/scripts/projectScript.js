let ipc = require("electron").ipcRenderer,
  //$  = require('jquery'),
  User                = require("../models/user.js"),
  Project             = require("../models/project.js"),
  Task                = require("../models/task.js"),
  mongoose            = require("mongoose"),
  currProject         = null,
  membersDropdownHTML = "<option value='unassigned'>unassigned</option>";

mongoose.connect(
  "mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test",
  { useNewUrlParser: true }
);

ipc.on('show-project-page', (event, id) => {
    
    Project.findById(id).populate("tasks").populate("tree").exec(function (err, aProject) {
      if(err) console.log(err);
      //populate neccesary fields
      console.log(aProject);
      currProject = aProject;
      clearSandbox();
      populateMainPage(aProject);
      populateTaskPage(aProject);
      populateProjectModal(aProject);
    });
});

function clearSandbox(){
  $("#sortable1").html("");
  $("#sortable2").html("");
  $("#sortable3").html("");
  $("#sortable4").html("");
  $("#pending").html("");
  $("#sprint1").html("");
  $("#sprint2").html("");
  $("#sprint3").html("");
}

function populateMainPage(project){
  $("#projectName").text(project.name);
  $("#projectDescription").text(project.description);
  $("#projectMembers").html('');
  project._doc.members.forEach((member) => {
    membersDropdownHTML += "<option value=`" + member + "'>" + member + "</option>";

    $("#projectMembers").append(
      `<div class="content">
        <img class="ui avatar image" src="` + "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png" + `">
        <a class="header">` + member + `</a>
      </div>`
    )
  });
  addDropdown();
}

function populateTaskPage(project){
  project.tasks.forEach((task) => {
    addTask(task);
  });
}

function populateProjectModal(project){
  $("#projName").val(project.name);
  $("#projDesc").val(project.description);
}

//when the task accept button is clicked 
$("#taskAccept").on("click", () => {
  var aTask = {
    type       : $("#typeField").val(),
    task       : $("#taskField").val(),
    description: $("#descriptionField").val()
  }
  Task.create(aTask, (err, theTask) => {
    if(err) console.log(err);
    currProject.tasks.push(theTask);
    currProject.save();
    addTask(theTask);

  });
});

//when the edit project button is clicked
$("#acceptChange").on("click", () => {
  var projectName        = $("#projName").val();
  var projectDescription = $("#projDesc").val();
  var projectIcon        = $("#projIcon").val();

  currProject.name        = projectName;
  currProject.description = projectDescription;
  currProject.icon        = projectIcon;
  currProject.save((err) => {
    if(err) console.log(err)
  });

  populateMainPage(currProject);
});

$(function(){
	$("#editProjectBtn").click(function(){
		$(".ui.modal").modal('show');
	});
	$(".ui.modal").modal({
		closable: true
	});
});

function addTask(aTask){
  if(aTask.type == "0"){
    $("#sortable1").append(
      `<li id=` + aTask.id + ` class="ui-state-default">`
        + aTask.task +
      `</li>` 
    );

    $("#pending").append(
      `<div id="b` + aTask.id + `" class="portlet">
      <div class="portlet-header">` + aTask.task +
      `</div>
      <div class="portlet-content">` + aTask.description + 
      `<br><label>Assigned To:</label>        
      <select id="a` + aTask.id + `" class="ui dropdown" onchange="assignTask(this)">` +
      membersDropdownHTML + `</select>
      </div> 
      </div>`
    );
  } else if(aTask.type == "1"){
    $("#sortable2").append(
      `<li id=` + aTask.id + ` class="ui-state-default">`
      + aTask.task + `</li>` 
    );

    $("#inProgress").append(
      `<div id="b` + aTask.id + `" class="portlet">
      <div class="portlet-header">` + aTask.task +
      `</div>
      <div class="portlet-content">` + aTask.description + 
      `<br><label>Assigned To:</label>        
      <select id="a` + aTask.id + `" class="ui dropdown" onchange="assignTask(this)">` +
      membersDropdownHTML + `</select>
      </div> 
      </div>`
    );
  } else if(aTask.type == "2"){
    $("#sortable3").append(
      `<li id=` + aTask.id + ` class="ui-state-default">`
      + aTask.task + `</li>` 
    );

    $("#complete").append(
      `<div id="b` + aTask.id + `" class="portlet">
      <div class="portlet-header">` + aTask.task +
      `</div>
      <div class="portlet-content">` + aTask.description + 
      `<br><label>Assigned To:</label>        
      <select id="a` + aTask.id + `" class="ui dropdown" onchange="assignTask(this)">` +
      membersDropdownHTML + `</select>
      </div> 
      </div>`
    );
  } else{
    $("#sortable4").append(
      `<li id=` + aTask.id + ` class="ui-state-default">`
      + aTask.task + `</li>` 
    );

    $("#pending").append(
      `<div id="b` + aTask.id + `" class="portlet">
      <div class="portlet-header">` + aTask.task +
      `</div>
      <div class="portlet-content">` + aTask.description + 
      `<br><label>Assigned To:</label>        
      <select id="a` + aTask.id + `" class="ui dropdown" onchange="assignTask(this)">` +
      membersDropdownHTML + `</select>
      </div> 
      </div>`
    );
  }
  $("#a"+aTask.id).val(aTask.assignedTo);
  taskViewStyle();
}

// Allow for tabbing of main page to function
$(".menu .item").tab();

$( function() {
  $( "#sortable1, #sortable2" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
} );

$( function() {
  $( "#sortable3, #sortable4" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
} );

$('#trash').droppable({
  drop: function (event, ui) {
    Task.findByIdAndDelete(event.originalEvent.target.id, (err) => {
      if(err) console.log(err);
    });
    
    ui.draggable.remove();

    $("#b"+ event.originalEvent.target.id).remove();
  }
});

$('.ui.accordion')
.accordion()
;

function taskViewStyle() {
  $( ".pillar" ).sortable({
    connectWith: ".pillar",
    handle     : ".portlet-header",
    cancel     : ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all"
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).on( "click", function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  });
}

function addDropdown(){
  $("#specialField").append(membersDropdownHTML);
}

function assignTask(obj){
  var id = obj.id;

  var val = $("#" + id).val();
  console.log(val);

  Task.findById(id.substring(1), (err, aTask) => {
    if(err) console.log(err)
    else{
      aTask.assignedTo = val;

      aTask.save();
    }
    

  });
}