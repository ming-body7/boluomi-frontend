/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('merchantsController', ['$scope','DataService',function($scope, DataService){

        $scope.list = {};
        var page = 0;
        var pageSize = 10;
        //$scope.GetProductList = GetProductList;
        DataService.GetProductList(page, pageSize, function(response){
            if (response.success) {
                $scope.list = response.data.list;
            }
        });
    }]);