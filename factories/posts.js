module.exports = function ($http) {
  return {
    list: function (channel_id) {
      return $http.get('/api/channels/' + channel_id + '/posts')

    },
    create: function (channel_id, post) {
      return $http.post('/api/channels/' + channel_id + '/posts', post)
    }
  }
}