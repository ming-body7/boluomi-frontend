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
        $scope.getCode = getCode;

        $scope.submitted = false;
        $scope.getCodeSubmitted = false;


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
                    //TODO:密码错误
                    //TODO:验证码错误
                }
            });
        };

        function getCode(){
            $scope.getCodeSubmitted = true;
            if(!(Object.keys($scope.resetAccountForm.account.$error).length == 0)){
                return;
            }
            AuthenticationService.GetCode($scope.phone, function(response){
                if (response.success) {
                    alert("successful");
                } else {
                    alert("error");
                    //TODO: 如果手机号已经注册过，回复已经注册过
                }
            });
        }
    }

})();
