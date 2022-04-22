// Load the 'vitalsigns' controller
const vitalsigns = require('../controllers/vitalsigns.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/vitalsigns')
    .get(vitalsigns.list)
    .post( vitalsigns.create);
//
    app.route('/api/vitalsigns/:vitalSignId')
    .get(vitalsigns.read)
    .put(auth.requiresLogin, vitalsigns.update)
    .delete(auth.requiresLogin,  vitalsigns.delete);

//
app.param('vitalSignId', vitalsigns.vitalSignByID);
    
};

