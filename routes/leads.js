var express = require('express');
var router = express.Router();
var dbUtil = require('../util/dbutil');

/* GET leads listing. */
router.get('/', function(req, res, next) {
	var leadName = req.query.name;
	dbUtil.findLeads(leadName, function(data, err) {
		if(err) {
			throw err;
		}
		res.json(data);
	});

});

// Update leads in the request body
router.put('/', function(req, res, next) {
	var leadsToUpdate = req.body;
	
	dbUtil.updateLeads(leadsToUpdate, function(data, err) {
		if(err) {
			throw err;
		}
		res.end('Leads updated: ' + data);
	});

});

module.exports = router;
