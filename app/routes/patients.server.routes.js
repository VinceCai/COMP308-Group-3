// Load the 'patients' controller
const patients = require('../controllers/patients.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/patients')
    .get(patients.list)
    .post(patients.create);

    app.route('/api/nonursepatients')
    .get(patients.listnonursepatients)
//
    app.route('/api/patients/:patientId')
    .get(patients.read)
    .put(auth.requiresLogin, patients.update)
    .delete(auth.requiresLogin,  patients.drop);

//
app.param('patientId', patients.patientByID);
    
};

