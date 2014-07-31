'use strict';

angular.module('mean.pack1').controller('Pack1Controller', ['$scope', 'Global', 'Pack1',
  function($scope, Global, Pack1) {
    $scope.global = Global;
    $scope.package = {
      name: 'pack1'
    };
  }
]);
