'use strict';

// Addressey Controller Module
var addresseyControllers = angular.module('addresseyControllers', []);



addresseyControllers.controller('bookController', ['$scope', '$rootScope', '$location', 'currentAuth', 'authService', 'contactService', function($scope, $rootScope, $location, currentAuth, authService, contactService) {
  // Get current user's email address to display on the navbar
  authService.getCurrentUser();

  $scope.newContact = {firstName: '', lastName: '', emailAddress: '', phoneNumber: '', streetAddress: '', city: '', country: '', zipPostal: ''};

  $scope.saveContact = function() {
    $scope.newContact = {firstName: $scope.contact.firstName, lastName: $scope.contact.lastName, emailAddress: $scope.contact.emailAddress, phoneNumber: $scope.contact.phoneNumber, streetAddress: $scope.contact.streetAddress, city: $scope.contact.city, country: $scope.contact.country, zipPostal: $scope.contact.zipPostal};
    contactService.saveContact($scope.newContact, $rootScope.loggedInUser.uid);
    
  };
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
