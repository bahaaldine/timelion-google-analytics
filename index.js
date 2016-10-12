module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'timelion-google-analytics',
    require: ['timelion'],
    init: function (server) {
      server.plugins.timelion.addFunction(require('./functions/ganalytics'));
    }
  });
};
