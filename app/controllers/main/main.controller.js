(function () {
    'use strict';
	angular
        .module('myApp')
        .controller('mainController', ['$scope','$rootScope',function($scope, $rootScope){
            this.$scope = $scope;
            $scope.admin = $rootScope.admin;
        }]);    
})();