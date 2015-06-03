var app = angular.module('nxVideoMgntApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('providerService', function($resource){
	return $resource('/Provider');
});

app.controller('mainController', function( $scope, $rootScope){
	$scope.providers = [
        {
          "name" : "KBO",
          "cameras" : [
            {
              "name" : "cam0",
              "operationMode" : "2",
              "operationState" : 4,

            },
            {
              "name" : "cam1",
              "operationMode" : "2",
              "operationState" : "4",

            }],
            "date" : "2015-06-01T16:53:03.772Z"
        },
        {
          "_id" : "556c8e67fdc50864040b29b2",
          "name" : "KBU",
          "cameras" : [
            {
              "name" : "cam0",
              "operationMode" : "2",
              "operationState" : 4,
            },
            {
              "name" : "cam1",
              "operationMode" : "2",
              "operationState" : "4",
            }],
            "date" : "2015-06-01T16:53:03.772Z"
        }       
        ];


	
  $scope.setValue = function(provider){
    $scope.selectedProvider = provider;
  }

});

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/user', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});

