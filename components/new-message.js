var h = require('hyperscript')

exports.url = '/channel/:channel_id/messages/new'
exports.template = render().outerHTML
exports.controller = [
  '$scope',
  'posts',
  '$state',
  '$stateParams', 
  component
]

function component ($scope, posts, $state, $stateParams) {
  $scope.channel_id = $stateParams.channel_id

  $scope.create = function (post) {
    posts.create($stateParams.channel_id, post).then(function (result) {
      
      if (result.data.ok) {
        $state.go('messages', { channel_id: $stateParams.channel_id })
      }  
      // handle errors
    }, function (err) {
      console.log(err)
    })
    
  }
}

function render () {
  return h('.container', [
    h('h3', 'New Post'),
    h('form', {
      'data-ng-submit': 'create(post)'
    }, [
      h('.form-group', [
        h('label.sr-only', 'Body'),
        h('textarea.form-control', {
          'data-ng-model': 'post.body',
          placeholder: '[Enter Message]'
        })
      ]),
      h('.form-group', [
        h('button.btn.btn-primary', 'Create Post'),
        h('a.btn.btn-warning', {
          'data-ui-sref': 'messages({channel_id: channel_id})',
          style: {
            'margin-left': '5px'
          }
        }, 'Cancel')
      ])
    ])
  ])
}