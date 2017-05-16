var express = require('express');
var dbutil = require('../util/dbutil');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
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
			// check if password matches
			if(user.password != req.body.user) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}
			else {
				// create token if user is found and password is right
				var signingSecret = process.env.SIGNING_SECRET;
				var token = jwt.sign(user, signingSecret, {
					expiresIn: 86400 // token expired in 24 hours
				});

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
