// Load the module dependencies
const mongoose = require('mongoose');
const EmergencyAlert = mongoose.model('EmergencyAlert');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


// Create a new emergencyAlert
exports.create = function (req, res, next) {
	// Create a new instance of the 'EmergencyAlert' Mongoose model
	console.log("request body: " + req.body);
    var emergencyAlert = new EmergencyAlert(req.body); //get data from React form

	// Use the 'EmergencyAlert' instance's 'save' method to save a new emergencyAlert document
	emergencyAlert.save(function (err) {
		if (err) {
			console.error("got error when create to db: "+ err);
			// Call the next middleware with an error message
			return res.status(400).send({
				error: err,
				message: 'failed to create emergency alert'
			});
		} else {
			// Use the 'response' object to send a JSON response
			res.status(201).json(emergencyAlert);
			
		}
	});

};
//
// Returns all emergencyAlerts
exports.list = function (req, res, next) {
	// Access the provided 'page' and 'limt' query parameters
    let patientId = req.query.patient;
	let nurseId = req.query.nurse;
	var filter = {};
	if (patientId) {
		filter['patient'] = patientId;
	}
	if (nurseId) {
		filter['nurse'] = nurseId
	}
    // Use the 'Patient' instance's 'find' method to retrieve a new patient document
	EmergencyAlert.find(filter)
			.populate('patient')
			.populate('nurse')
			.then(emergencyAlertList => {
				res.json(emergencyAlertList);
			}).catch(err => {
				console.log("got error when query db: "+ err);
				return res.status(400).send({
					error: err,
					message: 'failed to query patient emergency alert list'
				});
			});

};

//'read' controller method to display a emergencyAlert
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	EmergencyAlert.findById(req.emergencyAlert._id)
	.populate('patient')
	.populate('nurse')
	.then(emergencyAlert => {
		res.json(emergencyAlert);
	})
	.catch(err => {
		console.error("got error when query db: "+ err);
		return res.status(500).send({
			error: err,
			message: 'failed to query patient emergency alert information'
		});
	});
};

//update a emergencyAlert by id
exports.update = function(req, res, next) {
    console.log(req.body);
    EmergencyAlert.findByIdAndUpdate(req.emergencyAlert._id, req.body, {new : true }, function (err, emergencyAlert) {
      if (err) {
        console.error("got error when update db: "+ err);
        return next(err);
      }
      res.json(emergencyAlert);
    });
};

// delete a emergencyAlert by id
exports.delete = function(req, res, next) {
    EmergencyAlert.findByIdAndRemove(req.emergencyAlert._id, req.body, function (err, emergencyAlert) {
      if (err) {
		console.error("got error when delete db: "+ err);
		return res.status(400).send({
			error: err,
			message: 'failed to delete emergency alert'
		});
	  }
      res.status(204).json();
    });
};

// 'emergencyAlertByID' controller method to find a emergencyAlert by its emergencyAlertid
exports.emergencyAlertByID = function (req, res, next, emergencyAlertId) {
	// Use the 'EmergencyAlert' static 'findOne' method to retrieve a specific emergencyAlert
	EmergencyAlert.findOne({
        _id: emergencyAlertId
	}, (err, emergencyAlert) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			if (emergencyAlert) {
				console.log("found emergency alert from db: "+emergencyAlert);
			} else {
				console.error("The emergency alert not found by id " + emergencyAlertId);
				return res.status(404).json({"code": 404, 
											 "message": "the emergency alert "+emergencyAlertId+" is not found."
											});
			}
			// Set the 'req.emergencyAlert' property
            req.emergencyAlert = emergencyAlert;
            console.log("load the req.emergencyAlert: " + req.emergencyAlert);
			// Call the next middleware
			next();
		}
	});
};


