module.exports = function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', require('./components/home'))    
    .state('newChannel', require('./components/new-channel'))
    .state('messages', require('./components/messages'))
    .state('newMessage', require('./components/new-message'))
}