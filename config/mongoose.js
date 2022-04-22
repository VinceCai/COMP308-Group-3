// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true, useCreateIndex: true 
    })
    .then(() => {
      console.log('DB Connected!');
      var seedData = require('./seedData');
      seedData();
    })
		.catch(err => {
		  console.log('Error');
		});

    // Load the "User" model 
    require('../app/models/User');
    require('../app/models/Patient');
    require('../app/models/Nurse');
  // load Patient model
    require('../app/models/DailyTips');
    require('../app/models/VitalSign');
    require('../app/models/EmergencyAlert');
    require('../app/models/Symptom');
    // Return the Mongoose connection instance
    return db;
};