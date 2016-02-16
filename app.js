// MODULE - list of dependent modules in the [] please.
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource', 'ngRoute']);

console.log('configure the app');
angularApp.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/pages/main.html',
        controller: 'mainController'
    }).when('/other/', {
        templateUrl: '/pages/other.html',
        controller: 'otherController'
    }).when('/other/:num', {
        templateUrl: '/pages/other.html',
        controller: 'otherController'
    });
});

angularApp.service('shawService', function() {
   var self = this;
this.name = 'Shaw';
    this.namelength = function()
    {
        return self.name.length;
    }
});

// CONTROLLERS
//We use the controller with the array to re-specify the services so that they don't get broken during minification.
//Minifiers do not replace strings so Angular knows to pair them in order to the minified function.
angularApp.controller('mainController', ['$scope', '$log', '$filter', '$resource', '$timeout', '$http', 'shawService', function ($scope, $log, $filter, $resource, $timeout, $http, shawService) {
    console.log('in the main!');

    console.log(shawService);
    //setup($scope, $log);
    
    $scope.serviceValue = shawService.name;
    
    $scope.$watch('name', function()
                 {
        shawService.name = $scope.serviceValue;
    })
    
    $scope.rules = [
        { name:'shaw', age:28 },
        { name:'jeff', age:27 }
    ];
    $scope.formattedname = $filter('uppercase')($scope.name);
    
    $scope.alertMe = function(){
        alert('Hey!!!');
    };
    
    $log.debug($scope.formattedname);
    
    $timeout(function () {
        $scope.name = 'Everybody';
    }, 3000);
    
    $scope.lowercasehandle = function ()
    {
        return $filter('lowercase')($scope.handle);
    }
    console.log($scope.$watch);
    
    /*$scope.$watch('handle', function(newValue, oldValue){
        console.info('changed');
        console.log('old:' + oldValue);
        console.log('new:' + newValue);
    });*/
    
    setTimeout(function(){
        //Apply to trigger the digest loop if we do something outside the loop.
        //Angular usually handles but maybe something in jQuery or another library.
        $scope.$apply(function() {
        $scope.handle='HELLO!';
        console.log('scope changed!');
        });
    }, 3000);
    
    $http.get('https://api.github.com/users/octocat').success(function(result){
        $scope.data = result;
    }).error(function(data,status){
        console.log(data);
    })
}]);

angularApp.controller('otherController', ['$scope', '$routeParams', 'shawService', function ($scope, $routeParams, shawService)
                                         {
                                             console.log('in the other');
                                             $scope.title = $routeParams.num;
                                             $scope.serviceValue = shawService.name;
                                         }]);



