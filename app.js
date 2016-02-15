// MODULE - list of dependent modules in the [] please.
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource']);

// CONTROLLERS
//We use the controller with the array to re-specify the services so that they don't get broken during minification.
//Minifiers do not replace strings so Angular knows to pair them in order to the minified function.
angularApp.controller('mainController', ['$scope', '$log', '$filter', '$resource', function ($scope, $log, $filter, $resource) {
    //console.log($scope);
    $log.log('log');
    $log.info('fyi');
    $log.warn('hey!');
    
    $scope.name = 'Shaw';
    $scope.formattedname = $filter('uppercase')($scope.name);
    
    $log.debug($scope.formattedname);
}]);



