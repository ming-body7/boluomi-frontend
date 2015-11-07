(function () {
    'use strict';
	angular
        .module('myApp')
        .controller('hotController', ['$scope',function($scope){
            this.$scope = $scope;
            var hotProductList = {};
            hotProductList.count = 2;
            hotProductList.content = [{title:"你是我一生得守候"},{title:"你是我二声的守候"}];

            $scope.hotProductList = hotProductList;

            $scope.goUp = goUp;
            $scope.goDown = goDown;
            $scope.replaceProduct = replaceProduct;
            $scope.deleteProduct = deleteProduct;


            function goUp(item){
                var index = $scope.hotProductList.content.indexOf(item);
                if(index > 0){
                    var temp = $scope.hotProductList.content[index - 1];
                    $scope.hotProductList.content[index - 1] = item;
                    $scope.hotProductList.content[index] = temp;
                }
            }

            function goDown(item){
                var index = $scope.hotProductList.content.indexOf(item);
                if(index < $scope.hotProductList.content.length){
                    var temp = $scope.hotProductList.content[index + 1];
                    $scope.hotProductList.content[index + 1] = item;
                    $scope.hotProductList.content[index] = temp;
                }

            }

            function replaceProduct(item){

            }

            function deleteProduct(item){
                var index = $scope.hotProductList.content.indexOf(item);
                $scope.hotProductList.content.splice(index, 1);
            }


        }]);    
})();