/**
 * Created by body7 on 16/3/3.
 */
angular.module('myApp.directive',[]).directive('loginForgetZone', function () {
    return {
        restrict: 'EA',
        templateUrl: 'views/loginForget.view.html',
        scope:false,
        link: function ($scope, element, attrs) {
            $scope.loginFormVisible = true;
            $scope.forget = function(){
                $scope.loginFormVisible = false;
            }
        }
    };
});