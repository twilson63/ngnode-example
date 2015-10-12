var h = require('hyperscript')

exports.url = '/channels/new'
exports.template = render().outerHTML
exports.controller = [
  '$scope',
  'messages',
  '$state', 
  component
]

function component ($scope, messages, $state) {
  $scope.create = function (channel) {
    channel.unread = 0
    messages.create(channel).then(function (result) {
      if (result.data.ok) {
        $state.go('home')
      }  
      // handle errors
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