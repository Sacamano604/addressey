'use strict';
// Addressey's App Module
var addresseyApp = angular.module('addresseyApp',[
  'ngRoute'
]);
// Addressey's route provider
addresseyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        templateUrl: 'addressey/welcome.html'
      }).
      when('/login', {
        templateUrl: 'addressey/login.html'
      }).
      when('/register', {
        templateUrl: 'addressey/register.html'
      }).
      when('/book', {
        templateUrl: 'addressey/book.html'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);
