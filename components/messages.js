var h = require('hyperscript')

exports.url = '/channel/:channel_id/messages'
exports.template = render().outerHTML
exports.controller = [
  '$scope',
  '$stateParams',
  'posts',
  component
]

function component ($scope, $stateParams, posts) {
  $scope.channel_id = $stateParams.channel_id

  posts.list($stateParams.channel_id)
    .then(function (posts) {
      $scope.posts = posts.data
    })
}

function render () {
  return h('.container', [
    h('.pull-right', [
      h('a.btn.btn-primary', {
        'data-ui-sref': 'newMessage({ channel_id: channel_id})'
      }, 'New Post'),
      h('a.btn.btn-warning', {
        'data-ui-sref': 'home',
        style: {
          'margin-left': '5px'
        }
      }, 'Home')
    ]),
    h('h3', 'Messaging'),
    h('.list-group', [
      h('a.list-group-item', {
        'data-ng-repeat': 'post in posts'
      }, [
        h('h5', '{{post.body}}')
      ])
    ])
  ])
}