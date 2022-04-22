const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
    symptom_title: {
        type: String,
        required:true
    },
    symptom_desc: {
        type: String
    }
})

module.exports =  mongoose.model('Symptom', SymptomSchema)