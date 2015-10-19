var newEvent = require('palmettoflow-event').newEvent

module.exports = function ($http) {
  return {
    // list: function () {
    //   return $http.get('/api/channels')
    // },
    // create: function (channel) {
    //   return $http.post('/api/channels', channel)
    // },
    list: function () {
      var ne = newEvent('channels', 'list', {})
      return $http.post('/api', ne)
        .then(function (result) {
          return result.data.object
        })
    },
    create: function (channel) {
      var ne = newEvent('channels', 'create', channel)
      return $http.post('/api', ne)
        .then(function (result) {
          return result.data.object
        })
    }
  }
}