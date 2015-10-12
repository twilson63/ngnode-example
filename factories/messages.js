module.exports = function ($http) {
  return {
    list: function () {
      return $http.get('/api/channels')
    },
    create: function (channel) {
      return $http.post('/api/channels', channel)
    }
  }
}