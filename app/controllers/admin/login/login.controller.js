(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('adminLoginController', adminLoginController);

    adminLoginController.$inject = ['$rootScope','$state', 'AuthenticationService','$scope','UserService'];
    function adminLoginController($rootScope, $state, AuthenticationService,$scope, UserService) {


        $scope.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                if (response.success) {

                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key);

                    UserService.setAccessLevel('admin');

                    $state.go('admin.merchants');
                } else {

                    $scope.dataLoading = false;
                }
            });
        };
    }

})();
