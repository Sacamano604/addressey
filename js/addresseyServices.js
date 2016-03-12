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
  // Service for firebaseAuth
  .factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
      var ref = new Firebase('https://addressey.firebaseio.com/');
      return $firebaseAuth(ref);
    }
  ])
  // Authentication Service
  .factory('authService', function($firebaseObject, $location, FIREBASE_URL, $rootScope, dataService) {
    var authRef = new Firebase(FIREBASE_URL);

    var authServiceObject = {
      // Register Function
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
      // Login Function
      login: function(user) {
        authRef.authWithPassword({email: user.email, password: user.password}, function(error, authData) {
          if (error) {
            // Need to display an error to the user, instead of console logging it.
            console.log("Login Failed!", error);
          } else {
            $rootScope.currentUser = true;
            console.log("Authenticated successfully with payload:", authData.uid);
            // If the user was created successfully then show them the address book.
            $location.path('/book');
            $rootScope.$apply();
          }
        });
      },
      // Logout Function
      logout: function() {
        authRef.unauth();
        $rootScope.currentUser = null;
        $location.path('/');
      },
      // Getting current user
      getCurrentUser: function() {
        var userData =  authRef.getAuth();
        $rootScope.loggedInUser = userData;
        // return userData.password.email;
      }
    };


    return authServiceObject;

  })
