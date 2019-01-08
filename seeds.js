var mongoose = require("mongoose");
var User    = require("./models/user");
var Project = require("./models/project");
var Task    = require("./models/task");

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
    },
    {
        name    : "Jaime Lannister",
        email   : "jlan@gmail.com",
        userName: "jlan",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg/220px-Jaime_Lannister-Nikolaj_Coster-Waldau.jpg"
    },
    {
        name    : "Cersei Lannister",
        email   : "clan@gmail.com",
        userName: "clan",
        password: "1234",
        image   : "http://images6.fanpop.com/image/photos/38400000/cersei-baratheon-cersei-lannister-38426227-333-500.jpg"
    },
    {
        name    : "Sansa Stark",
        email   : "sansa@gmail.com",
        userName: "sansastark",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/SophieTurnerasSansaStark.jpg/220px-SophieTurnerasSansaStark.jpg"
    },
    {
        name    : "Arya Stark",
        email   : "aryastark@gmail.com",
        userName: "aryastark",
        password: "1234",
        image   : "https://pixel.nymag.com/imgs/daily/vulture/2017/07/18/18-arya-stark.w700.h700.jpg"
    },
    {
        name    : "Theon Greyjoy",
        email   : "reek@gmail.com",
        userName: "reek",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Theon_Greyjoy-Alfie_Allen.jpg/220px-Theon_Greyjoy-Alfie_Allen.jpg"
    },
    {
        name    : "Bran Stark",
        email   : "branstark@gmail.com",
        userName: "branstark",
        password: "1234",
        image   : "https://cdn-images-1.medium.com/max/1024/1*7Xqha-f6KlgcdyydxXd5lw.jpeg"
    },
    {
        name    : "Joffrey Baratheon",
        email   : "joffrey@gmail.com",
        userName: "joffrey",
        password: "1234",
        image   : "https://imgix.bustle.com/rehost/2016/9/13/4adf8a0d-0382-4354-9880-aeed9fea6d30.png?w=970&h=582&fit=crop&crop=faces&auto=format&q=70"
    },
    {
        name    : "The Hound",
        email   : "hound@gmail.com",
        userName: "hound",
        password: "1234",
        image   : "https://www.thedailybell.com/wp-content/uploads/2017/03/The_Hound-e1489748178291.jpg"
    },
    {
        name    : "Tyrion Lannister",
        email   : "tyrion@gmail.com",
        userName: "tyrion",
        password: "1234",
        image   : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peter-dinklage-look-1536330273.jpg?resize=480:*"
    },
    {
        name    : "Samwell Tarly",
        email   : "samtarly@gmail.com",
        userName: "samtarly",
        password: "1234",
        image   : "https://pbs.twimg.com/profile_images/931471017444282368/LCnRiRZb_400x400.jpg"
    },
    {
        name    : "Ramsay Bolton",
        email   : "ramsay@gmail.com",
        userName: "ramsay",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ramsay_Bolton-_-Iwan_Rheon.jpg/220px-Ramsay_Bolton-_-Iwan_Rheon.jpg"
    },
    {
        name    : "The Mountain",
        email   : "mountain@gmail.com",
        userName: "mountain",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Gregor_Clegane-The_Mountain-Haf%C3%BE%C3%B3r_J%C3%BAl%C3%ADus_Bj%C3%B6rnsson.jpg/220px-Gregor_Clegane-The_Mountain-Haf%C3%BE%C3%B3r_J%C3%BAl%C3%ADus_Bj%C3%B6rnsson.jpg"
    },
    {
        name    : "Khal Drogo",
        email   : "khaldrogo@gmail.com",
        userName: "khaldrogo",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Khal_Drogo-Jason_Momoa.jpg/220px-Khal_Drogo-Jason_Momoa.jpg"
    },
    {
        name    : "Davos Seaworth",
        email   : "davos@gmail.com",
        userName: "davos",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Davos_Seaworth-Liam_Cunningham.jpg/220px-Davos_Seaworth-Liam_Cunningham.jpg"
    },
    {
        name    : "Melisandre",
        email   : "melisandre@gmail.com",
        userName: "melisandre",
        password: "1234",
        image   : "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Melisandre-Carice_van_Houten.jpg/220px-Melisandre-Carice_van_Houten.jpg"
    }
];

var projectData = 
    {
        name       : "NiceScrum",
        description: "Case management tool for teams",
        tasks      : [],
    };


function seedDB(){
    //Remove all users
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");

        Project.deleteMany({}, (err) => {
            if(err){
                console.log(err);
            }
            console.log("removed projects!");
            Task.deleteMany({}, (err) => {
                if(err){
                    console.log(err);
                }

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

                        userData.forEach(function(seed){
                            User.create(seed, function(err, user){
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log("added a user");
                                    if(user.userName === "danytar" || user.userName === "jonsnow" || user.userName === "nedstark"){
                                        user.projects.push(project);
                                        //console.log(user); 
                                        user.save();  
                                    }
                                console.log(user);       
                                }
                            });
                        });
                    }    
                });
            });
        });
    }); 
}

module.exports = seedDB;