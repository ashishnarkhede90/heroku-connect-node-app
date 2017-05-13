var express = require('express');
var router = express.Router();
var dbUtil = require('../util/dbutil');

/* GET leads listing. */
router.get('/', function(req, res, next) {

	dbUtil.findLeads(function(data, err) {

		res.json(data);
	});

});

// Update leads in the request body
router.put('/', function(req, res, next) {

	var leadsToUpdate = req.body;
	dbUtil.updateLeads(leadsToUpdate, function(err) {
		if(err) {
			throw err;
		}
		res.end('Leads updated');
	});

});

module.exports = router;
