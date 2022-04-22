// Load the module dependencies
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
//const jwtExpirySeconds = 24 * 60 * 60; // 24 hours expired
const jwtExpirySeconds = 5 * 60; // 5 minutes expired
const jwtKey =config.secretKey;

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'User Number already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

//
// authenticates a user for signin
exports.signin = function(req, res, next) {
	// Get credentials from request
	console.log(req.body)
	const email = req.body.email;
	const password  = req.body.password;
	console.log(password)
	console.log(email)
	//find the user with given email using static method findOne
	User.findOne({email: email}, (err, user) => {
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
			console.log(user)
			if (!user) {
				return res.status(404).send({
					code: 404,
					message: "user account not found"
				});
			}
		
			//compare passwords	
			if(bcrypt.compareSync(password, user.password)) {
				// Create a new token with the user id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({  id: user.id, 
										  role: user.role, 
										  email: user.email }, 
										jwtKey, 
								{algorithm: 'HS256', 
								 expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true});
				res.status(200).send({ token: token, user: user, message: "login succeed" });
				//
				//res.json({status:"success", message: "user found!!!", data:{user:
				//user, token:token}});
				
				req.user=user;
				//call the next middleware
				//next()
			} else {
				res.status(401).json({status: "error", message: "wrong password!!!",
				data: null});
			}
			
		}
		
	});
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	var token = req.cookies.token;
	console.log("token from request cookie: "+ token);
	if (!token) {
		token = req.headers.authorization;
		console.log(req.headers);
		console.log("token from request header Authorization: "+ token);
	}
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end("no token found. please login firstly")
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  console.error("verify jwt token failed: "+ e);
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end("invalid token. please login firstly")
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end("invalid request")
	}
  
	// Finally, return the welcome message to the user, along with their
	// role given in the token
	// use back-quotes here
	res.send({role: payload.role, 
			  email: payload.email})
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the user back to the main application page
	//res.redirect('/');
}
//check if the user is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	var token = req.cookies.token;
	console.log("token from request cookie: "+ token);
	if (!token) {
		token = req.headers.authorization;
		console.log(req.headers);
		console.log("token from request header Authorization: "+ token);
	}
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'not auth, please login firstly' }).end();
	}
	
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  console.error("verify isSignedIn jwt token failed: "+ e);
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the role given in the token
	res.status(200).send({ role: payload.role, email: payload.email });
}

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	var token = req.cookies.token;
	console.log("token from request cookie: "+ token);
	if (!token) {
		token = req.headers.authorization;
		console.log("token from request header Authorization: "+ token);
	}
	
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).json({ error: 'no token was found in request. You need login first.' });
	}

	return next();

	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey);
	  console.log('in requires Login - payload:', payload);
	  req.role = payload.role;
	  req.email = payload.email;
	} catch (e) {
	  console.error("verify requiresLogin jwt token failed: "+ e);
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end("invalid token: " + e);
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end("invalid request: " + e);
	}
	// user is authenticated
	//call next function in line
    next();
};

//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user has permission ( is admin or not)  to EDIT/DELETE the current course
exports.hasAuthorization = function (req, res, next) {

    console.log('in hasAuthorization - user: ', req.email)
    //console.log('in hasAuthorization - user: ',req.user._id)

    if (req.email != "foxpeer@gmail.com") { //only the first register user (admin) can CRUD course
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

