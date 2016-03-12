'use strict';

// Addressey Controller Module
var addresseyControllers = angular.module('addresseyControllers', []);



addresseyControllers.controller('bookController', ['$scope', '$location', 'currentAuth', 'authService', function($scope, $location, currentAuth, authService) {
  authService.getCurrentUser();
  //
  // $scope.newContact = {firstName: '', lastName: '', emailAddress: '', phoneNumber: '', streetAddress: '', city: '', country: '', zipPostal: ''};
  //
  // $scope.saveContact = function() {
  //   contactService.saveContact($scope.newContact, $scope.currentUser.id);
  //   $scope.newContact = {firstName: '', lastName: '', emailAddress: '', phoneNumber: '', streetAddress: '', city: '', country: '', zipPostal: ''};
  // };



}]);



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
  };
  // Method to log out the user
  $scope.logout = function() {
    authService.logout();
  }

}]);



// Controller that handles which nav link is active based on the current page loaded
addresseyControllers.controller('navController', ["$scope", "$location", function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
    };
  }
]);
