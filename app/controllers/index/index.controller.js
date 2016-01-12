(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['AuthenticationService','$scope','$rootScope', '$state','DataService','UserService'];
    function indexController(AuthenticationService,$scope, $rootScope, $state, DataService,UserService) {


        $scope.login = login;
        $scope.checkLoginStatus = checkLoginStatus;

        (function initController() {
            //AuthenticationService.ClearCredentials();
            AuthenticationService.GetCredentials();

        })();

        function checkLoginStatus(){
            if($rootScope.globals!=null&& $rootScope.globals.role == 'user'){
                UserService.setAccessLevel('user');
                $state.go('main');
                return true;
            }else{
                return false;
            }

        }
        function login() {
            if($rootScope.globals!=null && $rootScope.globals.role != 'anonymous'){
                UserService.setAccessLevel('user');
                $state.go('main');
            }else{
                AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
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
                                $state.go('main');
                                break;
                        }; */

                        UserService.setAccessLevel('user');
                        $state.go('main');

                    } else {

                        alert("用户名或密码错误");
                    }
                });
            }


        };
    }

})();