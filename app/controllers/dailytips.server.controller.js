// Load the module dependencies
const mongoose = require('mongoose');
const DailyTips = mongoose.model('DailyTips');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');


// Create a new dailyTips
exports.create = function (req, res, next) {
	// Create a new instance of the 'DailyTips' Mongoose model
	console.log("request body: " + req.body);
    var dailyTips = new DailyTips(req.body); //get data from React form

	// Use the 'DailyTips' instance's 'save' method to save a new dailyTips document
	dailyTips.save(function (err) {
		if (err) {
			// Call the next middleware with an error message
			return res.status(400).send({
				error: err,
				message: 'failed to create daily tips'
			});
		} else {
			// Use the 'response' object to send a JSON response
			res.status(201).json(dailyTips);
			
		}
	});

};
//
// Returns all dailyTipss
exports.list = function (req, res, next) {
	// Access the provided 'page' and 'limt' query parameters
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
	DailyTips.find(filter)
			.populate('patient')
			.populate('nurse')
			.then(dailyTipsList => {
				res.json(dailyTipsList);
			}).catch(err => {
				console.log("got error when query db: "+ err);
				return res.status(400).send({
					error: err,
					message: 'failed to query patient daily tips list'
				});
			});
};

//'read' controller method to display a dailyTips
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	// Use the 'response' object to send a JSON response
	DailyTips.findById(req.dailyTips._id)
	.populate('patient')
	.populate('nurse')
	.then(dailyTips => {
		res.json(dailyTips);
	})
	.catch(err => {
		console.error("got error when query db: "+ err);
		return res.status(500).send({
			error: err,
			message: 'failed to query patient daily tips information'
		});
	});
};

//update a dailyTips by id
exports.update = function(req, res, next) {
    console.log(req.body);
    DailyTips.findByIdAndUpdate(req.dailyTips._id, req.body, {new : true }, function (err, dailyTips) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(dailyTips);
    });
};

// delete a dailyTips by id
exports.delete = function(req, res, next) {
    DailyTips.findByIdAndRemove(req.dailyTips._id, req.body, function (err, dailyTips) {
      if (err) {
		return res.status(400).send({
			error: err,
			message: 'failed to delete daily tips'
		});
	  }
      res.status(204).json();
    });
};

// 'dailyTipsByID' controller method to find a dailyTips by its dailyTipsId
exports.dailyTipsByID = function (req, res, next, dailyTipsId) {
	// Use the 'DailyTips' static 'findOne' method to retrieve a specific dailyTips
	DailyTips.findOne({
        _id: dailyTipsId
	}, (err, dailyTips) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			if (dailyTips) {
				console.log("found daily tips from db: "+dailyTips);
			} else {
				console.error("The daily tips not found by id " + dailyTipsId);
				return res.status(404).json({"code": 404, 
											 "message": "the daily tips "+dailyTipsId+" is not found."
											});
			}
			// Set the 'req.dailyTips' property
            req.dailyTips = dailyTips;
            
			// Call the next middleware
			next();
		}
	});
};


