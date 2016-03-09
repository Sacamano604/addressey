'use strict';

// Addressey Controller Module
var addresseyControllers = angular.module('addresseyControllers', []);

// Controller that handles which nav link is active based on the current page loaded
addresseyControllers.controller('navController', ["$scope", "$location",
  function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }
]);
