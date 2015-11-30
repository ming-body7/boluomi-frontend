(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('headerController', ['$scope','$rootScope','AuthenticationService','$location',function($scope, $rootScope,AuthenticationService,$location){

            $scope.loggedIn = $rootScope.globals.loggedIn;
            //$scope.user = $rootScope.globals.account;
            $scope.user = $rootScope.User;
            $scope.$watch(function() {
                return $rootScope.globals;
            }, function() {
                $scope.loggedIn = $rootScope.globals.loggedIn;
                //$scope.user = $rootScope.globals.account;
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
