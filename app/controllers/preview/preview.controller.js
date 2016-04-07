/**
 * Created by body7 on 16/1/9.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('previewController', previewController);

    previewController.$inject = ['$rootScope','$state', 'AuthenticationService','$scope','UserService','$stateParams', 'DataService'];
    function previewController($rootScope, $state, AuthenticationService,$scope, UserService, $stateParams, DataService) {
        var pid = $stateParams.pid;
        $scope.pid = pid;
        $scope.returnToDetailPage = returnToDetailPage;

        function returnToDetailPage(){
            DataService.DelProduct(pid, $rootScope.globals.authKey, function(response){
                if(response.success){
                    //
                    $state.go('main.content.modified',{pid:pid});

                }else{
                    //alert("删除失败");
                }
            });
        }

    }

})();
