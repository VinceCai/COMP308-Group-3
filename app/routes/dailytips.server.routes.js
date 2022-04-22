// Load the 'dailytips' controller
const dailytips = require('../controllers/dailytips.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/dailytips')
    .get(dailytips.list)
    .post( dailytips.create);
//
    app.route('/api/dailytips/:dailyTipsId')
    .get(dailytips.read)
    .put(auth.requiresLogin, dailytips.update)
    .delete(auth.requiresLogin,  dailytips.delete);

//
app.param('dailyTipsId', dailytips.dailyTipsByID);
    
};

