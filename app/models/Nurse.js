// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'NurseSchema'
var NurseSchema = new Schema({

	nurse: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

	license_number: {
		type: String,
		// Set a unique 'healthcard_number' index
		unique: true,
		// Validate 'healthcard_number' value existance
		required: 'healthcard_number is required',
		// Trim the 'healthcard_number' field
		trim: true
	}


});


// Configure the 'NurseSchema' to use getters and virtuals when transforming to JSON
NurseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Nurse' model out of the 'NurseSchema'
module.exports = mongoose.model('Nurse', NurseSchema);