(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['AuthenticationService','$scope','$rootScope', '$state'];
    function indexController(AuthenticationService,$scope, $rootScope, $state) {

        $rootScope.admin = false;
        $scope.login = login;


        (function initController() {
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.account, $scope.password, $scope.rememberMe, function (response) {
                if (response.success) {

                    AuthenticationService.SetCredentials($scope.account, response.data.auth_key, response.data.id);
                    var status = response.data.status;
                    switch(status){
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
                    };


                } else {

                    alert("用户名或密码错误");
                }
            });
        };
    }

})();