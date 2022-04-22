//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 

//Load the 'index' controller
const auth = require('../controllers/auth.server.controller');
//
//handle routing for get and post request
module.exports = function (app) {
   
    //authenticate student
    app.post('/signin', auth.signin);
    app.get('/signout', auth.signout);
    app.get('/read_cookie', auth.isSignedIn);  //check whether login

    //path to a protected page
    app.get('/welcome', auth.welcome);
    
};
