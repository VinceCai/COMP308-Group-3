const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmergencyAlertSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nurse: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    common_symptoms:{
        // the symptom selected
        type: String,
        required: true
    },
    request_desc:{
        type: String,
        required: true
    },
    request_time: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        // nurse acked or not. true: acked, false: not  acked
        default: false
    },
    reply_time:{
        type: Date,
    },
    reply:{
        type: String
    }
})

module.exports =  mongoose.model('EmergencyAlert', EmergencyAlertSchema)