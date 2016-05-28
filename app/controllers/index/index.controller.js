(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['UtilsService','AuthenticationService','$scope','$rootScope', '$state','DataService','UserService','$cookies','$timeout'];
    function indexController(UtilsService, AuthenticationService,$scope, $rootScope, $state, DataService,UserService,$cookies, $timeout) {

        $scope.default = {
            passcodeText:"获取验证码",
            loginButtonText:"登录"
        };
        $scope.loginForgetZoneVisible =false;
        $scope.showLinkBox = false;

        $scope.login = login;
        $scope.checkLoginStatus = checkLoginStatus;
        $scope.closeLoginAndForgetZone = closeLoginAndForgetZone;
        $scope.openLoginAndForgetZone = openLoginAndForgetZone;
        $scope.checkLoginStatus = checkLoginStatus;
        $scope.redirect = redirect;
        $scope.resetPassword = resetPassword;
        $scope.getPasscode = getPasscode;
        $scope.navigateToRegister = navigateToRegister;

        (function initController() {
            AuthenticationService.GetCredentials();
        })();

        function checkLoginStatus(){
            if($rootScope.globals != null && $rootScope.globals.role != null && $rootScope.globals.role != "" && $rootScope.globals.role != "anonymous"){
                redirect($rootScope.globals.role);
            }else{
                openLoginAndForgetZone();
            }
        }

        function redirect(role){

            switch(role){
                case "user":
                    $state.go('main.content.content');
                    break;
                case "user.brand":
                    $state.go('brand');
                    break;
                case "user.audit":
                    $state.go('audit');
                    break;
                default:
                    $state.go('audit');
            }

        }
        function login() {
            $scope.loginSubmitted = true;
            if(!(Object.keys($scope.loginForm.$error).length  == 0)){
                return;
            }

            $scope.default.loginButtonText = "登录中";
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                $scope.default.loginButtonText = "登录";
                if (response.success) {

                    DataService.GetMerchantInfo(function(response){
                        if(response.success){
                            $rootScope.User = response.data.detail;
                        }else{
                            console.log("无法加载商户信息");
                        }
                    });


                    var status = response.data.status;
                    var role = "";
                    var expireTime = 0;
                    //debug status
                    //status = 1;
                    switch(status){
                        case -1: //已删除
                            alert('你的信息已删除！');
                            closeLoginAndForgetZone();
                            return;
                        case 1: //已通过
                            role = "user";
                            expireTime = 24*60;
                            break;
                        case 9: //信息未完成  去完善信息
                            role = "user.brand";
                            expireTime = 30;
                            break;
                        case 0: //未审批
                            role = "user.audit";
                            expireTime = 30;
                            break;
                        default:
                            role = "user";
                            break;
                    };

                    //check if set remember me
                    if ($scope.rememberMe){
                        expireTime = 30*24*60;
                    }
                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key, response.data.id, role, expireTime);
                    redirect($rootScope.globals.role);

                } else {
                    if(response.data.account != null){
                        alert("用户名不存在，请先注册");
                    }else{
                        alert("密码错误,请重新输入");
                    }
                }
            });

        }

        function getPasscode(){
            //TODO:调用获取passcode的接口,倒计时
            if(!(Object.keys($scope.forgetForm.account.$error).length == 0)){
                return;
            }
            AuthenticationService.GetCode($scope.account, function(response){
                if(response.success){
                    countDownClock();
                    alert("已为您发送语音验证码，请注意接听电话，谢谢!");
                }else{
                    console.log("验证码获取失败");
                    console.log(response.data);
                }
            });

        }

        function resetPassword() {
            $scope.forgetSubmitted = true;
            if(!(Object.keys($scope.forgetForm.$error).length == 0)){
                return;
            }

            AuthenticationService.ResetPassword($scope.account, $scope.code, $scope.password, $scope.rePassword, function (response) {
                if (response.success) {
                    DataService.GetMerchantInfo(function(response){
                        if(response.success){
                            $rootScope.User = response.data.detail;
                        }else{
                            console.log("无法加载商户信息");
                        }
                    });


                    var status = response.data.status;
                    var role = "";
                    var expireTime = 0;
                    //debug status
                    //status = 1;
                    switch(status){
                        case -1: //已删除
                            alert('你的信息已删除！');
                            closeLoginAndForgetZone();
                            return;
                        case 1: //已通过
                            role = "user";
                            expireTime = 24*60;
                            break;
                        case 9: //信息未完成  去完善信息
                            role = "user.brand";
                            expireTime = 30;
                            break;
                        case 0: //未审批
                            role = "user.audit";
                            expireTime = 30;
                            break;
                        default:
                            role = "user";
                            break;
                    };

                    var expireTime = 30;  //30 min
                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key, response.data.id, role, expireTime);
                    redirect($rootScope.globals.role);
                } else {
                    //TODO:后端重设密码返回说明
                    alert("重设密码失败,请您稍后再试");
                }
            });
        }


        //page function

        function openLoginAndForgetZone(){
            $scope.loginForgetZoneVisible = true;
            $scope.loginFormVisible = true;
        }
        function closeLoginAndForgetZone(){
            $scope.loginForgetZoneVisible = false;
            $scope.loginSubmitted = false;
            $scope.forgetSubmitted =false;
        }

        function navigateToRegister(){
            AuthenticationService.ClearCredentials();
            $state.go("register");
        }

        function countDownClock(){
            $scope.counter = 60;
            $scope.countDown = function(){
                $scope.counter--;
                if($scope.counter >= 0){
                    $timeout($scope.countDown,1000);
                    $scope.default.passcodeText = $scope.counter;
                }else{
                    $scope.default.passcodeText = "重新获取验证码";
                }
            }
            $timeout($scope.countDown, 1000);

        }
    }

})();