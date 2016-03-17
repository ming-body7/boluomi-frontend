(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('appController', ['$scope', '$rootScope', 'DataService', '$state', '$cookies',
            function($scope, $rootScope, DataService, $state, $cookies){

            $rootScope.App = $scope.App = window.App;
            DataService.GetMerchantInfo(function(response){
                if(response.success){
                    $rootScope.User = response.data.detail;
                    //$state.go('main');
                }else{

                }
            });

                function initLastState(){
                    var currentStateString = $cookies.get('currentState')||{};
                    var currentState = null;
                    if(currentStateString.length>0){
                        currentState = JSON.parse(currentStateString);
                    }
                    if(currentState && currentState.toStateName!="index"){
                        //$state.go(currentState.toStateName, currentState.toParams);
                        $state.go("main.content.content", currentState.toParams);
                    }
                }

        }]);
})();