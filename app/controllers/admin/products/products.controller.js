/**
 * Created by body7 on 10/21/15.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .controller('productsController', ['$scope','DataService',function($scope, DataService){

            $scope.list = {};
            var page = 0;
            var pageSize = 10;
            $scope.demo_base_url = "wwww.boluomi1314.com/demo/?id=";



            $scope.deleteProduct = deleteProduct;
            $scope.getQRUrl = getQRUrl;



            DataService.AdminGetProductList(page, pageSize, function(response){
                if (response.success) {
                    $scope.list = response.data.list;
                }
            });

            function deleteProduct(x){
                var index = $scope.list.indexOf(x);
                $scope.list.splice(index, 1);
                //DataService.DeleteProductById(pid);

            }

            function getQRUrl(x){
                return $scope.demo_base_url+ x.id;
            }


            $scope.statusList = {
                "-1": "已删除",
                "0": "未审批",
                "1":"已通过"
            };

            $scope.methodList = {
                "-1": "恢复",
                "0": "通过",
                "1":"删除"
            };
            $scope.functionList = {
                "-1": function(product_id){
                    DataService.AdminAuditProduct(product_id, 1, function(response){
                        if(response.success){
                            alert("恢复成功");
                        }else{
                            alert("恢复失败");
                        }
                    });
                },
                "0": function(product_id){
                    DataService.AdminAuditProduct(product_id, 1, function(response){
                        if(response.success){
                            alert("通过成功");
                        }else{
                            alert("通过失败");
                        }
                    });
                },
                "1":function(product_id){
                    DataService.AdminAuditProduct(product_id, -1, function(response){
                        if(response.success){
                            alert("删除成功");
                        }else{
                            alert("删除失败");
                        }
                    });
                }
            };
        }]);
})();

