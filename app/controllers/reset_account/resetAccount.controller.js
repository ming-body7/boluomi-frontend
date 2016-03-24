/**
 * Created by body7 on 10/10/15.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('resetAccountController', resetAccountController);

    resetAccountController.$inject = ['$location', 'AuthenticationService','$scope', '$rootScope'];
    function resetAccountController($location, AuthenticationService,$scope,$rootScope) {


        $scope.resetAccount = resetAccount;
        $scope.submitted = false;

        function resetAccount() {
            $scope.submitted = true;
            if(!(Object.keys($scope.resetAccountForm.$error).length == 0)){
                return;
            }
            AuthenticationService.ResetAccount($rootScope.globals.authKey,  $scope.password, $scope.newAccount, $scope.code,function (response) {
                if (response.success) {
                    alert("successful");
                } else {
                    alert("error");
                }
            });
        };
    }

})();
