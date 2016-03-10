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
    // var auth = $firebaseObject(authRef);

    var authServiceObject = {
      register: function(user) {
        authRef.createUser({email: user.email, password: user.password}, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            // After successful creation we'll need to auto-call the login method
          }
        });
      } // comma before next one


    }
    return authServiceObject;

  })
