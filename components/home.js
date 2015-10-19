var h = require('hyperscript')
/*
  {
    url
    template
    controller
  }
*/

exports.url = '/'
exports.template = render().outerHTML
exports.controller = [
  '$scope',
  'channels',
  component
]

function component ($scope, channels) {
  channels.list().then(function (list) {
    $scope.channels = list
  })
}

function render () {
  return h('.container', [
    h('.pull-right', [
      h('a.btn.btn-primary', {
        'data-ui-sref': 'newChannel'
      }, 'New Channel')
    ]),
    h('h3', 'Messaging'),
    h('.list-group', [
      h('a.list-group-item', {
        'data-ng-repeat': 'channel in channels',
        'data-ui-sref': 'messages({channel_id: channel._id})'
      }, [
        h('.pull-right', [
          h('.badge.badge-default', '{{channel.posts}}'),
        ]),
        h('h5', '{{channel.name}}')
      ])
    ])
  ])
}