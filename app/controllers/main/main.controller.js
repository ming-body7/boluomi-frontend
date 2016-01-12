(function () {
    'use strict';
	angular
        .module('myApp')
        .controller('mainController', ['$scope','$rootScope', 'UserService',function($scope, $rootScope, UserService){
            $scope.permission = UserService.getAccessLevel();
            $scope.$watch(function(){
                return UserService.getAccessLevel();
            }, function(newVal){
                $scope.permission = newVal;
            }, true);

        }]);    
})();