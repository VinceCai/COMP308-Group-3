// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var UserSchema = new Schema({

	email: {
        type: String,
        unique: true,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"],
		required: true
	},

	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length >= 6,
			'Password should be longer'
		],
		required: true
	},

	first_name: {
		type: String,
		required: true
	},
	
	last_name: {
		type: String,
		required: true
	},

	address: String,

	city: String,

	phone_number: String,
	
	// date of birth
	birth_date: {
		type: Date,
		validate: {
		validator: function(v) {
			v.setFullYear(v.getFullYear()+0)
			const currentTime = new Date();
			currentTime.setHours(0,0,0,0);
			return v.getTime() <= currentTime.getTime();
		},
		message: props => 'DoB must be past.'
		},
		required: true
        
	},
	
	role: {
		type: String,
		enum : ['patient', 'nurse', 'admin'],
        default: 'patient'
	},
	created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    }
	
	
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.first_name + ' ' + this.last_name;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.first_name = splitName[0] || '';
	this.last_name = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
UserSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);
