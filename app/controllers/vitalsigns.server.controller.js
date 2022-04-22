// Load the module dependencies
const mongoose = require('mongoose');
const VitalSign = mongoose.model('VitalSign');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


// Create a new vitalSign
exports.create = function (req, res, next) {
	// Create a new instance of the 'VitalSign' Mongoose model
	console.log("request body: " + req.body);
    var vitalSign = new VitalSign(req.body); //get data from React form

	// Use the 'VitalSign' instance's 'save' method to save a new vitalSign document
	vitalSign.save(function (err) {
		if (err) {
			console.error("got error when create to db: "+ err);
			// Call the next middleware with an error message
			return res.status(400).send({
				error: err,
				message: 'failed to create vital sign'
			});
		} else {
			// Use the 'response' object to send a JSON response
			res.status(201).json(vitalSign);
			
		}
	});

};
//
// Returns all vitalSigns
exports.list = function (req, res, next) {
	// Access the provided 'page' and 'limt' query parameters
    let patientId = req.query.patient;
	let nurseId = req.query.nurse;
	var filter = {};
	if (patientId) {
		filter['patient'] = patientId;
	}
	if (nurseId) {
		filter['nurse'] = nurseId;
	}
	if (req.query.daily) {
		filter['daily'] =  {$eq: true};
		console.log('filter by daily '+filter['daily']);
	}
	
    // Use the 'Patient' instance's 'find' method to retrieve a new patient document
	VitalSign.find(filter)
			.populate('patient')
			.populate('nurse')
			.then(vitalSignList => {
				console.log(vitalSignList);
				res.json(vitalSignList);
			}).catch(err => {
				console.log("got error when query db: "+ err);
				return res.status(400).send({
					error: err,
					message: 'failed to query patient vital sign list'
				});
			});

};

//'read' controller method to display a vitalSign
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	VitalSign.findById(req.vitalSign._id)
	.populate('patient')
	.populate('nurse')
	.then(vitalSign => {
		res.json(vitalSign);
	})
	.catch(err => {
		console.error("got error when query db: "+ err);
		return res.status(500).send({
			error: err,
			message: 'failed to query patient vital sign information'
		});
	});
};

//update a vitalSign by id
exports.update = function(req, res, next) {
    console.log(req.body);
    VitalSign.findByIdAndUpdate(req.vitalSign._id, req.body, {new : true }, function (err, vitalSign) {
      if (err) {
        console.error("got error when update db: "+ err);
        return next(err);
      }
      res.json(vitalSign);
    });
};

// delete a vitalSign by id
exports.delete = function(req, res, next) {
    VitalSign.findByIdAndRemove(req.vitalSign._id, req.body, function (err, vitalSign) {
      if (err) {
		console.error("got error when delete db: "+ err);
		return res.status(400).send({
			error: err,
			message: 'failed to delete vital sign'
		});
	  }
      res.status(204).json();
    });
};

// 'vitalSignByID' controller method to find a vitalSign by its vitalSignid
exports.vitalSignByID = function (req, res, next, vitalSignId) {
	// Use the 'VitalSign' static 'findOne' method to retrieve a specific vitalSign
	VitalSign.findOne({
        _id: vitalSignId
	}, (err, vitalSign) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			if (vitalSign) {
				console.log("found vital sign from db: "+vitalSign);
			} else {
				console.error("The vital sign not found by id " + vitalSignId);
				return res.status(404).json({"code": 404, 
											 "message": "the vital sign "+vitalSignId+" is not found."
											});
			}
			// Set the 'req.vitalSign' property
            req.vitalSign = vitalSign;
            console.log("load the req.vitalSign: " + req.vitalSign);
			// Call the next middleware
			next();
		}
	});
};


