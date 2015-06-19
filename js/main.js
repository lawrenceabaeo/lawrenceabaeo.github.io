// MODULE
var myApp = angular.module('myApp', ['ngRoute']);

// SERVICES
// got help with promises at
// https://www.youtube.com/watch?v=rHmk0UhJSb4
myApp.service('getJSONDataService', ['$http', '$q', function($http, $q) {
  var deferred = $q.defer();
  $http.get('./projects.json').then(function(data)
    {
      deferred.resolve(data);
    });
  this.getData = function() {
    return deferred.promise;
  };
}]);

// ROUTES
myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'pages/projects.html',
    controller: 'ProjectsController'
  });
});

// CONTROLLER
myApp.controller('ProjectsController', ['$scope','getJSONDataService', function($scope, getJSONDataService) {
 var promise = getJSONDataService.getData(); 
   promise.then(function (data) {
     $scope.works = data.data.projects;
  });
}]);
