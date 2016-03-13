'use strict';
// Services
angular.module('addresseyServices', [])
  .value('FIREBASE_URL', 'https://addressey.firebaseio.com/')

  // *** DATA SERVICE ***
  .factory('dataService', function($firebaseObject, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebaseObject(dataRef);
    return fireData;
  })

  // *** AUTHENTICATION CONTROLLER ***
  .factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
      var ref = new Firebase('https://addressey.firebaseio.com/');
      return $firebaseAuth(ref);
    }
  ])

  // *** CONTACTS CONTROLLER ***
  .factory('contactService', function(dataService, $firebaseArray, $firebaseObject, $rootScope) {
    var ref = new Firebase('https://addressey.firebaseio.com/');
    var contactServiceObject = {
      saveContact: function(contact, userId) {
        var contacts = ref.child('contacts');
        contacts.child(userId).child('usersContacts').push(contact);
      },
      getContacts: function(userId) {
        return $firebaseArray(ref.child('contacts').child(userId).child('usersContacts'));
      },
      getContactDetails: function(user, contactId) {
        return $firebaseObject(ref.child('contacts').child(user).child('usersContacts').child(contactId));
      },
      editContact: function(contact, userId, contactId) {
        var updateRef = new Firebase('https://addressey.firebaseio.com/contacts/' + userId + '/usersContacts/' + contactId);
        updateRef.update(contact);
      },
      deleteContact: function(userId, contactId) {
        var deleteRef = new Firebase('https://addressey.firebaseio.com/contacts/' + userId + '/usersContacts/' + contactId);
        deleteRef.remove();
      }
    }
    return contactServiceObject;
  })

  // *** AUTHENTICATION SERVICE ***
  .factory('authService', function($firebaseObject, $location, FIREBASE_URL, $rootScope, dataService) {
    var authRef = new Firebase(FIREBASE_URL);
    var authServiceObject = {
      // Register Function
      register: function(user) {
        authRef.createUser({email: user.email, password: user.password}, function(error, userData) {
          if (error) {
            // Need to display an error to the user, instead of console logging it.
            $('#error').html(error);
          } else {
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
            $('#error').html(error);
          } else {
            $rootScope.currentUser = true;
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
        return userData.uid;
      }
    };
    return authServiceObject;
  });
