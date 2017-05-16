var pgp = require('pg-promise')();
var postgres = require('../lib/postgres.js');
var jwt = require('jsonwebtoken');

/**
* Created By: Ashish N
* Date: May 15, 2017
* Descrition: Method to check if user is authenticated
*/
var isAuthenticated = function(req, res, next) {
	console.log('*** isAuthenticated');
	validateRequest(req, res, function(decoded) {
		if(decoded) {
			next();
		}
	});
}


/**
* Created By: Ashish N
* Date: May 15, 2017
* Descrition: Method to validate request using token (if provided) in the request
*/
var validateRequest = function(req, res, callback) {
	console.log('*** validateRequest');

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, process.env.SIGNING_SECRET, function(err, decoded) {      
		  if (err) {
		    return res.json({ success: false, message: 'Failed to authenticate token.' });    
		  } else {
		    // if everything is good, save to request for use in other routes
		    req.decoded = decoded;    
		    callback(req.decoded);
		  }
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
		    success: false, 
		    message: 'No token provided.' 
		});

	}
}

module.exports = {
	isAuthenticated: isAuthenticated,
	validateRequest: validateRequest
};
