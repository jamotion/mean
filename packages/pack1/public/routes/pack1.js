'use strict';

angular.module('mean.pack1').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('pack1 example page', {
      url: '/pack1/example',
      templateUrl: 'pack1/views/index.html'
    });
  }
]);
