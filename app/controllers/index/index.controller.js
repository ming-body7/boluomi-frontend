(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['AuthenticationService','$scope','$rootScope', '$state'];
    function indexController(AuthenticationService,$scope, $rootScope, $state) {

        $rootScope.admin = false;
        $scope.login = login;


        (function initController() {
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key);
                    $state.go('main');
                } else {
                    alert(response.data);
                }
            });
        };
    }

})();