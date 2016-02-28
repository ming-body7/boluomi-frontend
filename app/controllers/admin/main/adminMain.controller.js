/**
 * Created by body7 on 16/2/21.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('adminMainController', ['$scope','$rootScope', '$state', 'UserService',function($scope, $rootScope,$state, UserService){

            $scope.permission = UserService.getAccessLevel();
            $scope.$watch(function(){
                return UserService.getAccessLevel();
            }, function(newVal){
                $scope.permission = newVal;
            }, true);

        }]);
})();