'use strict';

// Addressey Controller Module
var addresseyControllers = angular.module('addresseyControllers', []);

// *** ADDRESS BOOK CONTROLLER ***
// Controller that handles anything to do with the address book
addresseyControllers.controller('bookController', ['$scope', '$rootScope', '$location', 'currentAuth', 'authService', 'contactService', function($scope, $rootScope, $location, currentAuth, authService, contactService) {
  // Grab the current user's ID, and if it resolves then call the get contacts service to display all the user's contacts
  var userId = authService.getCurrentUser();
    if (userId) {
      $scope.contacts = contactService.getContacts(userId);
    }
  // Save contact function to insert a new contact into the DB
  $scope.newContact = {firstName: '', lastName: '', emailAddress: '', phoneNumber: '', streetAddress: '', city: '', country: '', zipPostal: ''};
  $scope.saveContact = function() {
    $scope.newContact = {firstName: $scope.contact.firstName, lastName: $scope.contact.lastName, emailAddress: $scope.contact.emailAddress, phoneNumber: $scope.contact.phoneNumber, streetAddress: $scope.contact.streetAddress, city: $scope.contact.city, country: $scope.contact.country, zipPostal: $scope.contact.zipPostal};
    contactService.saveContact($scope.newContact, $rootScope.loggedInUser.uid);
    //Clearing the form after a contact is submitted
    $scope.contact = {};
  };
  // View the contact's details
  $scope.viewContactDetails = function(contactId) {
    $scope.contactDetails = contactService.getContactDetails($rootScope.loggedInUser.uid, contactId);
    // Toggling the visibility of certains dom elements when we're viewing details or adding a contact
    $scope.confirmDelete = false;
    $scope.isAddingContact = false;
    $scope.isShowingEdit = false;
    $scope.isShowingDetails = true;
  };
  $scope.editContact = function(contactId) {
    // Toggling visibility of edit div, removing the details div
    $scope.editContactArray = {firstName: $scope.contactDetails.firstName, lastName: $scope.contactDetails.lastName, emailAddress: $scope.contactDetails.emailAddress, phoneNumber: $scope.contactDetails.phoneNumber, streetAddress: $scope.contactDetails.streetAddress, city: $scope.contactDetails.city, country: $scope.contactDetails.country, zipPostal: $scope.contactDetails.zipPostal};
    contactService.editContact($scope.editContactArray, $rootScope.loggedInUser.uid, contactId);
  };
  $scope.deleteContact = function(contactId) {
    contactService.deleteContact($rootScope.loggedInUser.uid, contactId);
    $scope.confirmDelete = false;
    $scope.isShowingDetails = false;
  };
  // When the user is adding a contact, hide the visibility of certain divs
  $scope.addingContact = function() {
    // Toggling the visibility of certains divs when we're viewing details or adding a contact
    $scope.isShowingEdit = false;
    $scope.isShowingDetails = false;
    $scope.isAddingContact = true;
  };
  $scope.showEditPane = function() {
    $scope.isShowingDetails = false;
    $scope.isShowingEdit = true;
  };
}]);

// *** AUTHENTICATION CONTROLLER ***
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

// *** NAVIGATON CONTROLLER ***
// Controller that handles which nav link is active based on the current page loaded
addresseyControllers.controller('navController', ["$scope", "$location", function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
    };
  }
]);
