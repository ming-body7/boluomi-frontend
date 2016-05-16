(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('registerController', registerController);
 
    registerController.$inject = ['UserService','$scope', 'AuthenticationService', '$timeout', '$state'];
    function registerController(UserService, $scope, AuthenticationService, $timeout, $state) {

        $scope.register = register;
        $scope.getPasscode = getPasscode;

        $scope.default = {
            passcodeText:"获取验证码"
        };

        function register() {
            angular.forEach($scope.registerForm.$error.required, function(field) {
                field.$setDirty();
            });
            if(!(Object.keys($scope.registerForm.$error).length == 0)){
                return;
            }

            UserService.Create($scope.user, function(response){
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.user.account, response.data.auth_key, response.data.id, 'user.brand',30);
                    $state.go('brand');
                } else {
                    for (var errorName in response.data) {
                        alert(response.data[errorName][0]);
                        break;
                    }
                    console.log(response.data);
                }
            });
        }
        function getPasscode(){
            if(!(Object.keys($scope.registerForm.account.$error).length == 0)){
                return;
            }
            AuthenticationService.GetCode($scope.user.account, function(response){
                if(response.success){
                    countDownClock();
                    alert("已为您发送语音验证码，请注意接听电话，谢谢!");
                }else{
                    alert("验证码已经发送,请您稍后重试");
                }
            });

        }

        function countDownClock(){
            $scope.counter = 60;
            $scope.countDown = function(){
                $scope.counter--;
                if($scope.counter >= 0){
                    $timeout($scope.countDown,1000);
                    $scope.default.passcodeText = $scope.counter;
                }else{
                    //alert("请重新获取验证码！");
                    $scope.default.passcodeText = "重新获取验证码";
                }
            }
            $timeout($scope.countDown, 1000);

        }
    }
 
})();