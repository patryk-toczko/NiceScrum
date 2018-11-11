let mongoose = require('mongoose'),
	  ipc = require('electron').ipcRenderer,
      //$        = require('jquery'),
      User = require('../models/user.js');

// Make connection to the database server
mongoose.connect('mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test', {useNewUrlParser: true});


// handle the login button being clicked
$('#loginBtn').on('click', () => {
	var userName = $('#userNameField').val();
	var password = $('#passwordField').val();
	// Query the db for the username given
	User.findOne({userName: userName}, (err, user) => {
		if(err){
			throw err;
		} else {
			console.log(user);
			// When user is not found update the login scrren with error
			if(user == null){
				$('#loginFailed').text('The username or password is invalid');
			} else { 
				user.comparePassword(password, (err, isMatch) => {
				if(err){
					throw err;
				} else {
					console.log(password, isMatch);	
					if(isMatch){
						ipc.send('login-successful', user);
					}
				}
				});
			}
			
		}
	});

	console.log(userName);
});

$('#regBtn').on('click', () => {
	var name     = $('#regName').val();
	var email    = $('#regEmail').val();
	var userName = $('#regUserName').val();
	var password = $('#regPassword').val();

	var newUser = new User({name: name, email: email, userName: userName, password: password});

	User.findOne({userName: userName}, (err, user) => {
		if(err){
			throw err;
		} else if(user !== null){
			$('#regFailed').text('User with given username already exists, please login or choose another username');
		} else {
			newUser.save((err, user) => {
				if(err){
					throw err;
				} else {
					ipc.send('login-successful', user);
				}
			});
		}

	});
});

// Allow for tabbing of login page to function
$('.menu .item').tab();