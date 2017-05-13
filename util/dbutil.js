var pgp = require('pg-promise')();
var postgres = require('../lib/postgres.js');


/**
* Created By: Ashish N
* Date: May 09, 2017
* Descrition: Method to find records in postgres
*/
var findLeads = function(cb) {
	console.log('*** findLeads');

	var tableName = process.env.LEAD_TABLE_NAME ? process.env.LEAD_TABLE_NAME : 'Lead';
	var findQuery = 'Select * From ' + tableName;
	console.log('*** findQuery: ' + findQuery);
	postgres.client.query(findQuery)
	.then(data => {
		if (data != null && data.length > 0){
			console.log(data.length);
			if(cb) {
				cb(data, null);
			}
		}
	})
	.catch(error => {
		if(cb) {
			cb(null, error);
		}
	});
}

/**
* Created By: Ashish N
* Date: May 09, 2017
* Descrition: Method to update records in postgres
*/
var updateLeads = function(leadsToUpdate, cb) {
	console.log('*** updateLeads');
	// using helpers namespace to dynamically generate update query. This allows to easily update multiple records without performance hit
	var dataMulti = leadsToUpdate;
	var cs = new pgp.helpers.ColumnSet(['?sfid', 'approval_status__c', 'tier__c'], {table: 'lead'});
	var updateQuery = pgp.helpers.update(dataMulti, cs, null, {tableAlias: 'X', valueAlias: 'Y'}) + ' WHERE Y.sfid = X.sfid';
	console.log('*** updateQuery: '+updateQuery);

	postgres.client.query(updateQuery)
	.then(data => {
		cb(data, null);
	})
	.catch(error => {
		if(cb) {
			cb(null, error);
		}
	});

//	cb();
}

module.exports = {
	findLeads: findLeads,
	updateLeads: updateLeads
}