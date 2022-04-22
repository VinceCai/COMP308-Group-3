// Load the module dependencies
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


// Create a new patient
exports.create = function (req, res, next) {
	// Create a new instance of the 'Patient' Mongoose model
    var patientObj = new Patient(req.body); //get data from React form
	console.log("create request object: " + patientObj);

	// Use the 'Patient' instance's 'save' method to save a new patient document
	patientObj.save(function (err) {
		if (err) {
			// Call the next middleware with an error message
			console.error("got error when save to db: " + err);
			return res.status(400).send({
				error: err,
				message: 'failed to create patient registeration information'
			});
		} else {
			// Use the 'response' object to send a JSON response
			res.status(201).json(patientObj);
		}
	});

};
//
// Returns all patients
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
	Patient.find(filter)
			.populate('patient')
			.populate('nurse')
			.then(patientList => {
				res.json(patientList);
			}).catch(err => {
				console.log("got error when query db: "+ err);
				return res.status(400).send({
					error: err,
					message: 'failed to query patient registration information list'
				});
			});
};

exports.listnonursepatients = function (req, res, next) {
	// Access the provided 'page' and 'limt' query parameters
    // Use the 'Patient' instance's 'find' method to retrieve a new patient document
	Patient.find({nurse:null})
			.populate('patient')
			.populate('nurse')
			.then(patientList => {
				res.json(patientList);
			}).catch(err => {
				console.log("got error when query db: "+ err);
				return res.status(400).send({
					error: err,
					message: 'failed to query patient registration information list'
				});
			});
};

//'read' controller method to display a patient
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	Patient.findById(req.patient._id)
	.populate('patient')
	.populate('nurse')
	.then(patient => {
		res.json(patient);
	})
	.catch(err => {
		console.log("got error when query db: "+ err);
		return res.status(500).send({
			error: err,
			message: 'failed to query patient registration information'
		});
	});
	
};

//update a patient by id
exports.update = function(req, res, next) {
	console.log("get the request object: " + req.body);
    Patient.findByIdAndUpdate(req.patient._id, req.body, {new : false }, function (err, patient) {
      if (err) {
        console.log(err);
        return res.status(500).send({
			error: err,
			message: 'failed to update patient registration information'
		});
      }
      res.json(patient);
    });
};

// delete a patient by id
exports.drop = function(req, res, next) {
    Patient.findByIdAndUpdate(req.patient._id, req.body, {new : false }, function (err, patient) {
      if (err) {
		return res.status(500).send({
			error: err,
			message: 'failed to delete the patient information'
		});
	  }
      res.status(204).json();
    });
};

// 'patientByID' controller method to find a patient by its patientid
exports.patientByID = function (req, res, next, patientId) {
	// Use the 'Patient' static 'findOne' method to retrieve a specific patient
	Patient.findOne({
        _id: patientId
	}, (err, patient) => {
		if (err) {
			// Call the next middleware with an error message
			console.error("query patient registration information unexpected error: "+err);
			return next(err);
		} else {
			if (patient) {
				console.log("found the patient registration information from db: "+patient);
			} else {
				console.error("The patient registration information was not found by id " + patientId);
				return res.status(404).json({"code": 404, 
											 "message": "the  patient registration information "+patientId+" was not found."
											});
			}
			// Set the 'req.patient' property
			req.patient = patient;
			console.log("load the req.patient: " + req.patient);
			// Call the next middleware
			next();
		}
	});
};


