var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
   	name    : String,
   	email   : String,
   	userName: {type: String, required: true, index: { unique: true} },
   	password: {type: String, required: true },
   	image   : {type: String, default: 'https://i.pinimg.com/236x/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9--profile-pictures-doe.jpg'},
   	projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }]
});

userSchema.methods.comparePassword = function(userPassword, cb){
	if(this.password === userPassword){
		cb(null, true);
	} else {
		cb(null, false);
	}
}

module.exports = mongoose.model("User", userSchema);