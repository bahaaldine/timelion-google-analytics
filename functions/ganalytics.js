var Datasource = require('../../../src/core_plugins/timelion/server/lib/classes/datasource');
var _ = require('lodash');
var moment = require('moment');
var googleUtils = require('./google_utils.js');

module.exports = new Datasource('ganalytics', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'viewId',
      types: ['string'],
      help: 'Google analytics view identifier'
    },
    {
      name: 'metrics',
      types: ['string', null],
      help: 'A list of comma separated analytics metrics to display: users, sessions, pageviews, pageviewsPerSession, sessionDuration, bounces, percentNewSessions. More here: https://developers.google.com/analytics/devguides/reporting/core/dimsmets'
    }
  ],
  help: 'Advanced math parsing.',
  fn: function ganalytics(args, tlConfig) {
    var config = _.defaults(args.byName, {
      metrics: "users, sessions, pageviews, pageviewsPerSession, sessionDuration, bounces, percentNewSessions"
    });

    var viewId = config.viewId;
    var metricsList = _.map(config.metrics.split(','), function(metric){
      return 'ga:' + metric.replace(/ /g,'');
    });
    var dimensionsList = ["ga:date"];
    var startDate = moment(tlConfig.time.from).format("YYYY-MM-DD");
    var endDate = moment(tlConfig.time.to).format("YYYY-MM-DD");

    var req = {
      reportRequests: [{
        viewId: viewId,
        dateRanges: [{
          startDate: startDate,
          endDate: endDate,
        }],
        metrics: _.map(metricsList, function(metric) {
          return { expression: metric }
        }),
        dimensions: _.map(dimensionsList, function(metric) {
          return { name: metric }
        })
      }]  
    };

    return googleUtils.authorize(req, tlConfig).then( function(request) {
      return googleUtils.getReport(request).then(function(seriesList) {
        return seriesList;
      });
    }, function(err) {
      console.log(err)
    });
  }
});
