var _ = require('lodash');
var moment = require('moment');
var google = require('googleapis');
var analyticsreporting = google.analyticsreporting('v4')
var Promise = require('bluebird');

module.exports.authorize = function(request, tlConfig) {
  return new Promise(function (resolve, reject) {
    var key = {
    	"type": tlConfig.settings['timelion:google.service_account.type'],
      "project_id": tlConfig.settings['timelion:google.service_account.project_id'],
      "private_key_id": tlConfig.settings['timelion:google.service_account.private_key_id'],
      "private_key": tlConfig.settings['timelion:google.service_account.private_key'],
      "client_email": tlConfig.settings['timelion:google.service_account.client_email'],
      "client_id": tlConfig.settings['timelion:google.service_account.client_id'],
      "auth_uri": tlConfig.settings['timelion:google.service_account.auth_uri'],
      "token_uri": tlConfig.settings['timelion:google.service_account.token_uri'],
      "auth_provider_x509_cert_url": tlConfig.settings['timelion:google.service_account.auth_provider_x509_cert_url'],
      "client_x509_cert_url": tlConfig.settings['timelion:google.service_account.client_x509_cert_url']
    }
    var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ["https://www.googleapis.com/auth/analytics"], null);

    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
      }

      resolve({
        'headers': {'Content-Type': 'application/json'},
        'auth': jwtClient,
        'resource': request,
      });
    });
  });
}

module.exports.getReport = function(request) {
  var lists = [];
  return new Promise(function(resolve, reject) {
    analyticsreporting.reports.batchGet(request, function(err, resp) {
      if ( typeof resp != "undefined" && resp != null ) {
      	var metricsList = _.map(resp.reports[0].columnHeader.metricHeader.metricHeaderEntries, function(metric){
      		return metric.name;
      	});
        const data = resp.reports[0].data.rows;
        for ( var i=0, l=metricsList.length; i<l; i++ ) {

          var serieList = {
            data: [],
            type: 'series',
            label: metricsList[i]
          }

          serieList.data = _.map(data, function(item) {
            return [ moment(item.dimensions, "YYYYMMDD").format("x"), item.metrics[0].values[i] ]
          });

          lists.push(serieList);
        }
      }
      resolve({
        type: 'seriesList',
        list: lists
      });
    });
  });
}