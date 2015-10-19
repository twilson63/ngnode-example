var h = require('hyperscript')

exports.url = '/channels/new'
exports.template = render().outerHTML
exports.controller = [
  '$scope',
  'channels',
  '$state',
  component
]

function component ($scope, channels, $state) {
  $scope.create = function (channel) {
    console.log('create called')
    channel.unread = 0
    channels.create(channel).then(function (response) {
      if (response.ok) {
        $state.go('home')
      }
      // handle errors
    }, function (err) {
      console.log(err)
    })

  }
}

function render () {
  return h('.container', [
    h('h3', 'New Channel'),
    h('form', {
      'data-ng-submit': 'create(channel)'
    }, [
      h('.form-group', [
        h('label.sr-only', 'Name'),
        h('input.form-control', {
          type: 'text',
          placeholder: 'Name',
          'data-ng-model': 'channel.name'
        })
      ]),
      h('.form-group', [
        h('button.btn.btn-primary', 'Create Channel'),
        h('a.btn.btn-warning', {
          'data-ui-sref': 'home',
          style: {
            'margin-left': '5px'
          }
        }, 'Cancel')
      ])
    ])
  ])
}