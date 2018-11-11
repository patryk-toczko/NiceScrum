var mongoose = require("mongoose");
var User    = require("./models/user");
var Project = require("./models/project");

mongoose.connect(
    "mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test",
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);

var userData = [
    {
        name    : "Jon Snow",
        email   : "jsnow@gmail.com",
        userName: "jonsnow",
        password: "1234",
        image   : "https://78.media.tumblr.com/ae9291439f733e6ea494b61c54d63830/tumblr_oayptz1lWD1tmwv7go5_400.png"
    },
    {
        name    : "Daenerys Targaryen",
        email   : "danytar@gmail.com",
        userName: "danytar",
        password: "1234",
        image   : "https://i.pinimg.com/originals/3a/59/b9/3a59b997c46f73b4ae78b4abd95ef856.jpg"
    },
    {
        name    : "Ned Stark",
        email   : "nedstark@gmail.com",
        userName: "nedstark",
        password: "1234",
        image   : "https://pbs.twimg.com/profile_images/533002540078477312/98X7lsxK.jpeg"
    }
];

var projectData = 
    {
        name       : "NiceScrum",
        description: "Case management tool for teams"
    };


function seedDB(){
    //Remove all users
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");

        Project.deleteMany({}, (err) => {
            console.log("removed projects!");

            //add a few projects
            Project.create(projectData, function(err, project){
                if(err){
                    throw err;
                } else {
                    console.log("added a project");
                    project.members.push("danytar");
                    project.members.push("jonsnow");
                    project.members.push("nedstark");
                    project.save();
                }
            });

            //add a few users
            userData.forEach(function(seed){
                User.create(seed, function(err, user){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a user");
                        Project.findOne({name: 'NiceScrum'}, (err, project) => {
                            if(err){
                                throw err;
                            } else {
                                user.projects.push(project);
                                console.log(user); 
                                user.save();  
                            }                       
                        });      
                    }
                });
            });
        }); 
    });
}

module.exports = seedDB;