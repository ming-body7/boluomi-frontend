(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['UtilsService','AuthenticationService','$scope','$rootScope', '$state','DataService','UserService','$cookies','$timeout'];
    function indexController(UtilsService, AuthenticationService,$scope, $rootScope, $state, DataService,UserService,$cookies, $timeout) {

        $scope.default = {
            passcodeText:"获取验证码",
            loginButtonText:"登陆"
        };
        $scope.loginForgetZoneVisible =false;
        $scope.showLinkBox = false;

        $scope.login = login;
        $scope.checkLoginStatus = checkLoginStatus;
        $scope.closeLoginAndForgetZone = closeLoginAndForgetZone;
        $scope.openLoginAndForgetZone = openLoginAndForgetZone;
        $scope.checkLoginStatus = checkLoginStatus;
        $scope.redirectToMain = redirectToMain;
        $scope.resetPassword = resetPassword;
        $scope.getPasscode = getPasscode;

        (function initController() {
            AuthenticationService.GetCredentials()
            if($rootScope.globals!=null&& $rootScope.globals.role == 'user'){
                //redirectToMain();
                UserService.setAccessLevel('user');
            }
        })();
        function openLoginAndForgetZone(){
            $scope.loginForgetZoneVisible = true;
            $scope.loginFormVisible = true;
        }
        function closeLoginAndForgetZone(){
            $scope.loginForgetZoneVisible = false;
            $scope.loginSubmitted = false;
            $scope.forgetSubmitted =false;
        }
        function checkLoginStatus(){
            if($rootScope.globals!=null&& $rootScope.globals.role == 'user'){
                redirectToMain();
            }else{
                openLoginAndForgetZone();
            }
        }
        function redirectToMain(){
            UserService.setAccessLevel('user');
            $state.go('main.content.content');
        }
        function login() {
            $scope.loginSubmitted = true;
            if(!(Object.keys($scope.loginForm.$error).length  == 0)){
                return;
            }
            if($rootScope.globals!=null && $rootScope.globals.role != 'anonymous'){
                UserService.setAccessLevel('user');
                $state.go('main.content.content');
            }else{
                $scope.default.loginButtonText = "登录中。。。";
                AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                    $scope.default.loginButtonText = "登录";
                    if (response.success) {

                        DataService.GetMerchantInfo(function(response){
                            if(response.success){
                                $rootScope.User = response.data.detail;
                            }else{

                            }
                        });
                        AuthenticationService.SetCredentials($scope.account, response.data.auth_key, response.data.id, 'user');
                        var status = response.data.status;
                        /*switch(status){
                            case 9: //信息未完成  去完善信息
                                //window.location.href = './finishbrandinfo.html';
                                $state.go('brand');
                                break;
                            case -1: //已删除
                                alert('你的信息已删除！');
                                break;
                            case 0: //未审批
                                //window.location.href = './audit.html';
                                $state.go('audit');
                                break;
                            case 1: //已通过
                                //TODO登录成功的跳转页面待定
                                //alert('登录成功');
                                $state.go('main.content.content');
                                break;
                        }; */

                        UserService.setAccessLevel('user');
                        $state.go('main.content.content');


                    } else {
                        if(response.data.account != null){
                            alert("用户名不存在，请先注册");
                        }else{
                            alert("用户名或密码错误");
                        }
                    }
                });
            }
        }
        function getPasscode(){
            //TODO:调用获取passcode的接口,倒计时
            if(!(Object.keys($scope.forgetForm.account.$error).length == 0)){
                return;
            }
            AuthenticationService.GetCode($scope.account, function(response){
                if(response.success){

                }
            });
            countDownClock();
            alert("已为您发送语音验证码，请注意接听电话，谢谢!");
        }
        function resetPassword() {
            $scope.forgetSubmitted = true;
            if(!(Object.keys($scope.forgetForm.$error).length == 0)){
                return;
            }

            AuthenticationService.ResetPassword($scope.account, $scope.code, $scope.password, $scope.rePassword, function (response) {
                if (response.success) {
                    //AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/login');
                } else {
                    //TODO:确认后端功能实现
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
                    alert("请重新获取验证码！");
                    $scope.default.passcodeText = "获取验证码";
                }
            }
            $timeout($scope.countDown, 1000);

        }
    }

})();