'use strict';
// Services
angular.module('addresseyServices', [])
  .value('FIREBASE_URL', 'https://addressey.firebaseio.com/')
  // Data Service
  .factory('dataService', function($firebaseObject, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebaseObject(dataRef);
    return fireData;
  })
  // Authentication Service
  .factory('authService', function($firebaseObject, $location, FIREBASE_URL, $rootScope, dataService) {
    var authRef = new Firebase(FIREBASE_URL);
    var authServiceObject = {
      register: function(user) {
        authRef.createUser({email: user.email, password: user.password}, function(error, userData) {
          if (error) {
            // Need to display an error to the user, instead of console logging it.
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            // If the user's account is created Successfully, pass that data over to the login method to auto-log them in.
            authServiceObject.login({email: user.email, password: user.password});
          }
        });
      },
      login: function(user) {
        authRef.authWithPassword({email: user.email, password: user.password}, function(error, authData) {
          if (error) {
            // Need to display an error to the user, instead of console logging it.
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            // If the user was created successfully then show them the address book.
            $location.path('/book').replace();
            $rootScope.$apply();
          }
        });
      }







    }
    return authServiceObject;

  })
