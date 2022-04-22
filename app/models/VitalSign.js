const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Define a new 'VitalSignSchema'
var VitalSignSchema = new Schema({
	nurse: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
	patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    body_temperature:{
        type: String
    },
    heart_rate:{
        type: String
    },
    respiratory_rate:{
        type: String
    },
    high_blood_pressure:{
        type: String
    },
    low_blood_pressure:{
        type: String
    },
    weight:{
        type: String
    },
    measured_time:{
        type: Date,
        // Create a default 'VitalSign_time' value
        default: Date.now
    },

    daily:{
        type: Boolean,
        // daily info measured by patient and input, otherwise measured by nurse in clinic
        default: false
    },
    read:{
        type: Boolean,
        // record nurse already read it or not if it is daily measured by patient
        default: false
    },
    reply_time:{
        type: Date,
    },
    reply:{
        type: String
    }
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
VitalSignSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('VitalSign', VitalSignSchema);
