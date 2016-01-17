/**
 * Created by body7 on 16/1/9.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('previewController', previewController);

    previewController.$inject = ['$rootScope','$state', 'AuthenticationService','$scope','UserService','$stateParams'];
    function previewController($rootScope, $state, AuthenticationService,$scope, UserService, $stateParams) {
        var pid = $stateParams.pid;
        $scope.pid = pid;
        $scope.getPreviewProductId = getPreviewProductId;

        function getPreviewProductId(){
            return pid;
        }

    }

})();
