'use strict';
// Addressey's App Module
var addresseyApp = angular.module('addresseyApp',[
  'ngRoute',
  'firebase',
  'addresseyControllers',
  'addresseyServices'
]);
//Checking for a logged in user and if not, redirect to the login page
addresseyApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);
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
        templateUrl: 'addressey/book.html',
        controller: 'bookController',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
              return Auth.$requireAuth();
          }]
        }
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);
