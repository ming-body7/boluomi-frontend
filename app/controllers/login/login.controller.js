(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$location', 'AuthenticationService','$scope','$rootScope'];
    function loginController($location, AuthenticationService,$scope, $rootScope) {
        $rootScope.admin = false;

        $scope.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key, response.data.id);
                    $location.path('/main');
                } else {

                    $scope.dataLoading = false;
                }
            });
        };
    }

})();
