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
  'messages',
  component
]

function component ($scope, messages) {
  messages.list().then(function (result) {
    $scope.channels = result.data
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
        'data-ui-sref': 'showChannel({id: channel.name})'
      }, [
        h('.pull-right', [
          h('.badge.badge-default', '{{channel.unread}}'),
        ]),
        h('h5', '{{channel.name}}')
      ])
    ])
  ])
}