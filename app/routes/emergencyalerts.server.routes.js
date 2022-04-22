// Load the 'emergencyalerts' controller
const emergencyalerts = require('../controllers/emergencyalerts.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/emergencyalerts')
    .get(emergencyalerts.list)
    .post( emergencyalerts.create);
//
    app.route('/api/emergencyalerts/:emergencyAlertId')
    .get(emergencyalerts.read)
    .put(auth.requiresLogin, emergencyalerts.update)
    .delete(auth.requiresLogin,  emergencyalerts.delete);

//
app.param('emergencyAlertId', emergencyalerts.emergencyAlertByID);
    
};

