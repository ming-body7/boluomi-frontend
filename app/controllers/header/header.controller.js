(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('headerController', ['$scope','$rootScope','AuthenticationService','$location', 'UserService',function($scope, $rootScope,AuthenticationService,$location, UserService){

            $scope.loggedIn = $rootScope.globals.loggedIn;
            //$scope.user = $rootScope.globals.account;
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
                        UserService.setAccessLevel('anonymous');
                    } else {


                    }
                });


            };


            
        }]);    
})();
