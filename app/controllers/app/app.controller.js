(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('appController', ['$scope', '$rootScope', 'DataService' ,function($scope, $rootScope, DataService){

            $rootScope.App = $scope.App = window.App;

            DataService.GetMerchantInfo(function(response){
                if(response.success){
                    $rootScope.User = response.data.detail;
                    //$state.go('main');
                }else{

                }
            });



        }]);
})();