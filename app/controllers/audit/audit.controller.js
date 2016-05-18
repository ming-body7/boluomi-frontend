/**
 * Created by body7 on 11/1/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('auditController', ['$scope', '$state', 'AuthenticationService',function($scope, $state, AuthenticationService){
            $scope.gotIt = gotIt;

            function gotIt(){
                AuthenticationService.ClearCredentials();
                $state.go('index');
            }

        }]);
})();