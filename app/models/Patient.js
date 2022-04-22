// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'PatientSchema'
var PatientSchema = new Schema({

	patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
	
	health_card_number: {
		type: Number,
		// Set a unique 'healthcard_number' index
		unique: true,
		// Validate 'healthcard_number' value existance
		required: 'health_card_number is required',
		// Trim the 'healthcard_number' field
		trim: true
	},

	// registered nurse for this patient
	nurse: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    }
	
});


// Configure the 'PatientSchema' to use getters and virtuals when transforming to JSON
PatientSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Patient' model out of the 'PatientSchema'
module.exports = mongoose.model('Patient', PatientSchema);