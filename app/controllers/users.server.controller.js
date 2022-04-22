// Load the module dependencies
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'User Number already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

// Create a new user
exports.create = function (req, res, next) {
	console.log("request body: " + req.body);
    var user = new User(req.body); //get data from React form
	console.log("body: " + req.body.email);
	Nurse.findOne({
		license_number:req.body.license_number
	}).then(foundNurse =>{
		if(foundNurse){
			console.log("find One with same license number, please change the license number and try again. ");
			res.status(409).json({ message: 'The license number exists' });
		} else {
			Patient.findOne ({
				health_card_number:req.body.health_card_number
			}).then(foundPatient =>{
				if(foundNurse){
					console.log("find One with same license number, please change the license number and try again. ");
					res.status(409).json({ message: 'The license number exists' });
				} else{
					User.findOne({
						email: req.body.email
					}).then(found =>{
						if (found) {	
							console.log("find One with same email, please change the email and try again. ");
							res.status(409).json({ message: 'The email already exists' });
						} else {
							// Use the 'User' instance's 'save' method to save a new user document
							user.save(function (err) {
								if (err) {
									// Call the next middleware with an error message
									return res.status(400).send({
										message: getErrorMessage(err)
									});
								} else {
									User.findOne({
										email: req.body.email
									}).then(found =>{
										if(req.body.role === 'patient'){
											console.log("save patient");
											console.log("email = " + req.body.email);
											var patientData = new Patient({
												"patient": found._id,
												"health_card_number": req.body.health_card_number
											});
											console.log("patient = " + patientData);
											patientData.save(function (err) {
												if (err) {
													// Call the next middleware with an error message
													return res.status(400).send({
														message: getErrorMessage(err)
													});
												} else {
													// Use the 'response' object to send a JSON response
													res.status(201).json(patientData);
												};
											});				
										} else {
											console.log("save nurse");
											var nurse = new Nurse({
												"nurse": found._id,
												"license_number": req.body.license_number
											});
											nurse.save(function (err) {
												if (err) {
													// Call the next middleware with an error message
													return res.status(400).send({
														message: getErrorMessage(err)
													});
												} else {
													// Use the 'response' object to send a JSON response
													res.status(201).json(nurse);
												};
											});				
										}
									});
								}
							});
						}
					});
				}
			})
		};
	}).catch(error => {
        res.send('error: ' + error);
    })
}
//
// Returns all users
exports.list = function (req, res, next) {
	// Use the 'User' instance's 'find' method to retrieve a new user document
	var filter = {};
	if (req.query.role) {
		filter['role'] = req.query.role
	}
	if (req.query.actived) {
		filter['actived'] = req.query.actived
	}
	console.log("user list filter " + filter);
    User.find(filter, function (err, users) {
        if (err) {
			return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(users);
        }
    });
};
//
//'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.user);
};
//
// 'userByID' controller method to find a user by its userid
exports.userByID = function (req, res, next, userid) {
	// find the user by user id or user email, the input userid maybe _id or email
	// Use the 'User' static 'findOne' method to retrieve a specific user
	User.findOne({
		'email': userid
	  }, (err, user) => {
		if (err) {
			return next(err);
		} else {
			if (!user) {
				User.findById(userid,
				  (err, user) => {
					if (err) {
						return next(err);
					} else { 
						if (!user) {
							console.error("user not found by user email nor _id " + userid);
							return res.status(404).json({"code": 404, 
														 "message": "the user "+userid+" is not found."
														});
						}
						// Set the 'req.user' property
						console.log("found user from db: "+user);
						req.user = user;
						// Call the next middleware
						next();
					}
				});
				return;
			} else {
				// Set the 'req.user' property
				console.log("found user from db: "+user);
				req.user = user;
				// Call the next middleware
				next();
			}
		}
	});
};

//update a user by id
exports.update = function(req, res, next) {
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, {new : true }, function (err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(user);
    });
};

// delete a user by id
exports.delete = function(req, res, next) {
    User.findByIdAndRemove(req.user._id, req.body, function (err, user) {
      if (err) {
		return res.status(400).send({
			message: getErrorMessage(err)
		});
	  }
      res.status(204).json();
    });
};
//


//List all message taken by a certain user
exports.listMessage = function (req, res, next){
    console.log("get message by user id .....");
    
    ChosenCourse.find({
        user: req.user.id,
    }).populate('course').populate('user').then( messageList => {
        res.status(200).json(messageList);
    }).catch(err => {
        res.status(400).send('something wrong when query message list: ' + err);
    });
}