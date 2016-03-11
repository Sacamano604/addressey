'use strict';
// Addressey's App Module
var addresseyApp = angular.module('addresseyApp',[
  'ngRoute',
  'firebase',
  'addresseyControllers',
  'addresseyServices'
]);
// Addressey's route provider
addresseyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        templateUrl: 'addressey/welcome.html'
      }).
      when('/login', {
        templateUrl: 'addressey/login.html',
        controller: 'authController'
      }).
      when('/register', {
        templateUrl: 'addressey/register.html',
        controller: 'authController'
      }).
      when('/book', {
        templateUrl: 'addressey/book.html'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);
