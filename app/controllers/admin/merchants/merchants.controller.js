/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('merchantsController', ['$scope','DataService',function($scope, DataService){

        $scope.list = {};
        var page = 0;
        var pageSize = 100;
        //$scope.GetProductList = GetProductList;
        DataService.AdminGetMerchantList(page, pageSize, function(response){
            if (response.success) {
                $scope.list = response.data.list;
            }
        });
        $scope.statusList = {
            "-1": "已删除",
            "0": "未审批",
            "1":"已通过"
        };

        $scope.methodList = {
            "-1": "恢复",
            "0": "通过",
            "1":"拉黑"
        };
        $scope.functionList = {
            "-1": function(merchant_id){
                DataService.AdminAuditMerchant(merchant_id, 1, function(response){
                    if(response.success){
                        alert("恢复成功");
                    }else{
                        alert("恢复失败");
                    }
                });
            },
            "0": function(merchant_id){
                DataService.AdminAuditMerchant(merchant_id, 1, function(response){
                    if(response.success){
                        alert("通过成功");
                    }else{
                        alert("通过失败");
                    }
                });
            },
            "1":function(merchant_id){
                DataService.AdminAuditMerchant(merchant_id, -1, function(response){
                    if(response.success){
                        alert("拉黑成功");
                    }else{
                        alert("拉黑失败");
                    }
                });
            }
        };

    }]);