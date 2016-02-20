(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('registerController', registerController);
 
    registerController.$inject = ['UserService', '$location','$scope', 'AuthenticationService'];
    function registerController(UserService, $location, $scope, AuthenticationService) {

        $scope.register = register;
        $scope.getPasscode = getPasscode;

        $scope.default = {
            passcodeText:"获取验证码"
        };

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

        function getPasscode(){
            //TODO:调用获取passcode的接口,倒计时
            countDownClock();
            alert("已为您发送语音验证码，请注意接听电话，谢谢!");
        }

        function countDownClock(){
            $scope.counter = 60;
            $scope.countDown = function(){
                $scope.counter--;
                if($scope.counter >= 0){
                    $timeout($scope.countDown,1000);
                    $scope.default.passcodeText = counter;
                }else{
                    alert("请重新获取验证码！");
                    $scope.default.passcodeText = "获取验证码";
                }
            }
            $timeout(countDown, 1000);

        }
    }
 
})();