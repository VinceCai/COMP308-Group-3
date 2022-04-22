// Load the 'symptoms' controller
const symptoms = require('../controllers/symptoms.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/symptoms')
    .get(symptoms.list)
    .post( symptoms.create);
//
    app.route('/api/symptoms/:symptomId')
    .get(symptoms.read)
    .put(auth.requiresLogin, symptoms.update)
    .delete(auth.requiresLogin,  symptoms.delete);

//
app.param('symptomId', symptoms.symptomByID);
    
};

