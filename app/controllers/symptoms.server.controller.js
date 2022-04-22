// Load the module dependencies
const mongoose = require('mongoose');
const Symptom = mongoose.model('Symptom');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


// Create a new symptom
exports.create = function (req, res, next) {
	// Create a new instance of the 'Symptom' Mongoose model
	console.log("request body: " + req.body);
    var symptom = new Symptom(req.body); //get data from React form

	// Use the 'Symptom' instance's 'save' method to save a new symptom document
	symptom.save(function (err) {
		if (err) {
			// Call the next middleware with an error message
			return res.status(400).send({
				error: err,
				message: 'failed to create commom symptom'
			});
		} else {
			// Use the 'response' object to send a JSON response
			res.status(201).json(symptom);
			
		}
	});

};
//
// Returns all symptoms
exports.list = function (req, res, next) {
	// Access the provided 'page' and 'limt' query parameters
    let patient = req.query.patient;
	let nurse = req.query.nurse;
	
    // Use the 'Symptom' instance's 'find' method to retrieve a new symptom document
    Symptom.find({}, function (err, symptomList) {
        if (err) {
			return res.status(400).send({
				error: err,
				message: 'failed to query commom symptom'
            });
        } else {
            res.json(symptomList);
        }
    });
};

//'read' controller method to display a symptom
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.symptom);
};

//update a symptom by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Symptom.findByIdAndUpdate(req.symptom._id, req.body, {new : true }, function (err, symptom) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(symptom);
    });
};

// delete a symptom by id
exports.delete = function(req, res, next) {
    Symptom.findByIdAndRemove(req.symptom._id, req.body, function (err, symptom) {
      if (err) {
		return res.status(400).send({
			error: err,
			message: 'failed to delete the commom symptom'
		});
	  }
      res.status(204).json();
    });
};

// 'symptomByID' controller method to find a symptom by its symptomid
exports.symptomByID = function (req, res, next, symptomId) {
	// Use the 'Symptom' static 'findOne' method to retrieve a specific symptom
	Symptom.findOne({
        _id: symptomId
	}, (err, symptom) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			if (symptom) {
				console.log("found the commom symptom from db: "+symptom);
			} else {
				console.error("The commom symptom not found by id " + symptomId);
				return res.status(404).json({"code": 404, 
											 "message": "the commom symptom "+symptomId+" is not found."
											});
			}
			// Set the 'req.symptom' property
            req.symptom = symptom;
            
			// Call the next middleware
			next();
		}
	});
};


