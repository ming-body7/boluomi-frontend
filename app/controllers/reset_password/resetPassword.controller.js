/**
 * Created by body7 on 10/10/15.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('resetPasswordController', resetPasswordController);

    resetPasswordController.$inject = ['$location', 'AuthenticationService','$scope', 'FlashService'];
    function resetPasswordController($location, AuthenticationService,$scope,FlashService) {


        $scope.resetPassword = resetPassword;


        function resetPassword() {
            $scope.dataLoading = true;
            AuthenticationService.ResetPassword($scope.account, $scope.code, $scope.password, $scope.rePassword, function (response) {
                if (response.success) {
                    //AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.data);
                    $scope.dataLoading = false;
                }
            });
        }
    }

})();
