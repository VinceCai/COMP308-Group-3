// Load the 'users' controller
const users = require('../controllers/users.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/users')
    .get(users.list)
    .post( users.create);
//
    app.route('/api/users/:email')
    .get(users.read)
    .put(auth.requiresLogin, users.update)
    .delete(auth.requiresLogin,  users.delete);

    app.route('/api/users/:email/message') 
            .get(auth.requiresLogin,  users.listMessage)
//
app.param('email', users.userByID);
    
};

