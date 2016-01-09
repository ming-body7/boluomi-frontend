(function () {
    'use strict';
	angular
        .module('myApp')
        .controller('mainController', ['$scope','$rootScope',function($scope, $rootScope){
            $scope.admin = $rootScope.admin;
            //$scope.admin = true;
            //$scope.user = $rootScope.User;
            $scope.$watch(function() {
                return $rootScope.admin;
            }, function() {
                //$scope.loggedIn = $rootScope.globals.loggedIn;
                //$scope.user = $rootScope.globals.account;
                $scope.user = $rootScope.admin;
            }, true);
        }]);    
})();