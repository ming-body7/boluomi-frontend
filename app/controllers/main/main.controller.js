(function () {
    'use strict';
	angular
        .module('myApp')
        .controller('mainController', ['$scope','$rootScope', '$state', 'UserService',function($scope, $rootScope,$state, UserService){
            $scope.permission = UserService.getAccessLevel();
            $scope.$watch(function(){
                return UserService.getAccessLevel();
            }, function(newVal){
                $scope.permission = newVal;
            }, true);

        }]);    
})();