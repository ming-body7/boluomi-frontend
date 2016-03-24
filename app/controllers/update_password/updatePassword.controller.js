/**
 * Created by body7 on 10/10/15.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('updatePasswordController', updatePasswordController);

    updatePasswordController.$inject = [ 'AuthenticationService','$scope', '$rootScope'];
    function updatePasswordController(AuthenticationService,$scope, $rootScope) {


        $scope.updatePassword = updatePassword;
        $scope.submitted = false;

        function updatePassword() {
            $scope.submitted = true;
            if(!(Object.keys($scope.updatePasswordForm.$error).length == 0)){
                return;
            }
            AuthenticationService.UpdatePassword($rootScope.globals.authKey, $scope.oldPassword, $scope.newPassword, $scope.reNewPassword, function (response) {
                if (response.success) {
                    alert("successful");
                    AuthenticationService.SetCredentials($rootScope.globals.account, response.data.auth_key);
                } else {
                    alert(response.data);
                    //TODO：原密码错误消息
                }
            });
        };
    }

})();

