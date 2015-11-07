(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('appController', ['$scope', '$rootScope',function($scope, $rootScope){
            var App;
            App = angular.copy(Config);
            window.App = $scope.App = $rootScope.App = App;

        }]);
})();