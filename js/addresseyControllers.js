'use strict';

// Addressey Controller Module
var addresseyControllers = angular.module('addresseyControllers', []);

// AuthController - Used for registering/logging in/logging out
addresseyControllers.controller('authController', ['$scope', '$location', 'authService', function($scope, $location, authService) {
  // Object bound to inputs on the register and login pages
  $scope.user = {email: '', password: ''};
  // Method to register a new user through the authService
  $scope.register = function() {
    authService.register($scope.user);
  };
  // Method to login a new user through the authService
  $scope.login = function() {
    authService.login($scope.user);
  }

}]);



// Controller that handles which nav link is active based on the current page loaded
addresseyControllers.controller('navController', ["$scope", "$location", function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
    };
  }
]);
