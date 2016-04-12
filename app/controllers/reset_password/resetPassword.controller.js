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
        $scope.getPasscode = getPasscode;

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

        function getPasscode(){
            //TODO:调用获取passcode的接口,倒计时
            if(!(Object.keys($scope.resetPasswordForm.account.$error).length == 0)){
                return;
            }
            AuthenticationService.GetCode($scope.account, function(response){
                if(response.success){

                }
            });
            countDownClock();
            alert("已为您发送语音验证码，请注意接听电话，谢谢!");
        }

        function countDownClock(){
            $scope.counter = 60;
            $scope.countDown = function(){
                $scope.counter--;
                if($scope.counter >= 0){
                    $timeout($scope.countDown,1000);
                    $scope.default.passcodeText = $scope.counter;
                }else{
                    alert("请重新获取验证码！");
                    $scope.default.passcodeText = "获取验证码";
                }
            }
            $timeout($scope.countDown, 1000);

        }
    }

})();
