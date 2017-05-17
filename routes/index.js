var express = require('express');
var dbutil = require('../util/dbutil');
var authutil = require('../util/authutil');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', authutil.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'WFEB 2017 Speaker Approval' });
});


// route to authenticate users
router.post('/authenticate', function(req, res, next) {
	console.log(req.body);
	
	// find the user record using the user details received in authentication request
	dbutil.findUser(req.body, function(err, user) {
		if(err) {
			throw err;
		}
		// user not found
		if(!user) {
			res.json( { success: false, message: 'Authentication failed. User not found'});
		}
		else if(user) {
			
			console.log(user instanceof Array);
			user = user[0];
			console.log(user);
			// check if password matches
			if(user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}
			else {
				// create token
				var token = authutil.createToken(user);
				// return json object along with token
				res.json({
					success: true,
					token: token
					//scopes: [] // powerful tool to design access control
				});
			}
		}
	});
});

module.exports = router;
