(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('registerController', registerController);
 
    registerController.$inject = ['UserService', '$location','$scope', 'AuthenticationService'];
    function registerController(UserService, $location, $scope, AuthenticationService) {

        $scope.register = register;

        function register() {
            UserService.Create($scope.user, function(response){
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.user.account, response.data.auth_key, response.data.id);
                    $location.path('/brand');
                } else {
                    alert(response.data);
                }
            });
        }
    }
 
})();