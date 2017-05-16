var pgp = require('pg-promise')();
var postgres = require('../lib/postgres.js');


/**
* Created By: Ashish N
* Date: May 09, 2017
* Descrition: Method to find records in postgres
*/
var findLeads = function(leadName, cb) {
	console.log('*** findLeads');
	var whereClause;

	var tableName = process.env.LEAD_TABLE_NAME ? process.env.LEAD_TABLE_NAME : 'Lead';
	var findQuery = "Select * From " + tableName + ' where approval_status__c is ${status} AND expected_opportunity_type__c = ${oppType} AND isconverted = ${isConverted}';
	if(leadName != null){
		whereClause = " WHERE Name LIKE '" + leadName + "%'"
		findQuery += whereClause;
	} 

	console.log('*** findQuery: ' + findQuery);
	postgres.client.query(findQuery, { status: null, oppType: 'Speaker', isConverted: false})
	.then(data => {
		if(cb) {
			cb(data, null);
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
	console.log(leadsToUpdate);
	
	// using helpers namespace to dynamically generate update query. This allows to easily update multiple records without performance hit
	var dataMulti = leadsToUpdate;
	var cs = new pgp.helpers.ColumnSet(['?sfid', 'approval_status__c', 'tier__c'], {table: process.env.LEAD_TABLE_NAME});
	var updateQuery = pgp.helpers.update(dataMulti, cs, null, {tableAlias: 'X', valueAlias: 'Y'}) + ' WHERE Y.sfid = X.sfid';
	// remove all the double quotes in the query string
	updateQuery = updateQuery.replace(/["]+/g, '');
	console.log('*** updateQuery: '+updateQuery);

	postgres.client.none(updateQuery)
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