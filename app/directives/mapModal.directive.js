/**
 * Created by body7 on 16/3/13.
 */
angular.module('myApp.directive',[]).directive('mapModal', function () {
    return {
        restrict: 'EA',
        templateUrl: 'views/mapModal.view.html',
        scope:false,
        link: function ($scope, element, attrs) {
            $scope.show = function(){

                element.css('width', '60%');
                element.css('margin', 'auto');
            }
            $scope.hide = function(){
                var docWidth = window.innerWidth;
                element.css('position', 'relative');
                element.css('display', 'inline-block');
                element.css('left',docWidth+'px')

            }



        }
    };
});