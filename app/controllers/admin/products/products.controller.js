/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('productsController', ['$scope','DataService',function($scope, DataService){

        $scope.list = {};
        var page = 0;
        var pageSize = 10;
        $scope.deleteProduct = deleteProduct;
        DataService.GetProductList(page, pageSize, function(response){
            if (response.success) {
                $scope.list = response.data.list;
            }
        });

        function deleteProduct(x){
            var index = $scope.list.indexOf(x);
            $scope.list.splice(index, 1);
            //DataService.DeleteProductById(pid);

        }
    }]);