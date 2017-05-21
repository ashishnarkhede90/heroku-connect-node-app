var express = require('express');
var router = express.Router();
var dbUtil = require('../util/dbutil');
var authUtil = require('../util/authutil');

/* Get leads listing. */
router.get('/', authUtil.isAuthorized, function(req, res, next) {
	var leadName = req.query.name;
	dbUtil.findLeads(leadName, function(data, err) {
		if(err) {
			throw err;
		}
		res.json({'status': 200, 'success': true, 'data': data});
	});

});

// Update leads in the request body
router.put('/', authUtil.isAuthorized, function(req, res, next) {
	var leadsToUpdate = req.body;
	
	dbUtil.updateLeads(leadsToUpdate, function(data, err) {
		if(err) {
			throw err;
		}
		res.json({'status': 200, 'success': true, 'data': data});
	});

});

// Get speaker contacts
/*router.get('/speakers', function(req, res, next) {
	dbUtil.findSpeakerContacts(function(data, err) {
		if(err) {
			throw err;
		}
		res.json(data);
	});
}); 
*/


module.exports = router;
