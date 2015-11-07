(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('registerController', registerController);
 
    registerController.$inject = ['UserService', '$location','$scope','FlashService'];
    function registerController(UserService, $location, $scope, FlashService) {

        $scope.register = register;

        function register() {

            $scope.dataLoading = true;

            UserService.Create($scope.user)
                .then(function (response) {
                    if (response.success) {
                        //FlashService.Success('Registration successful', true);
                        //alert("Registration successful");
                        $location.path('/brand');


                    } else {
                        //FlashService.Error(response.message);
                        alert(response.message);
                        $scope.dataLoading = false;
                    }
                });
        }
    }
 
})();