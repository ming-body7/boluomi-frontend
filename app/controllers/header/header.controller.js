(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('headerController', ['$scope','$rootScope','AuthenticationService','$location', 'UserService',function($scope, $rootScope,AuthenticationService,$location, UserService){

            $scope.permission = $rootScope.globals.role;
            $scope.$watch(function(){
                return $rootScope.globals.role;
            }, function(newVal){
                $scope.permission = newVal;
            }, true);


            $scope.user = $rootScope.User;
            $scope.$watch(function() {
                return $rootScope.User;
            }, function() {
                $scope.user = $rootScope.User;
            }, true);

            $scope.logout = logout;

            function logout() {
                AuthenticationService.Logout(function(response){
                    if (response.success) {
                        AuthenticationService.ClearCredentials();
                        $location.path('/index');

                    } else {


                    }
                });


            };


            
        }]);    
})();
