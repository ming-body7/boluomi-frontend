(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('adminLoginController', adminLoginController);

    adminLoginController.$inject = ['$rootScope','$state', 'AuthenticationService','$scope'];
    function adminLoginController($rootScope, $state, AuthenticationService,$scope) {


        $scope.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                if (response.success) {
                    $rootScope.admin = true;
                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key);
                    $state.go('admin.merchants');
                } else {

                    $scope.dataLoading = false;
                }
            });
        };
    }

})();
