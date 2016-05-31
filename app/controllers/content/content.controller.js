(function () {
	'use strict';
	angular.module('myApp')
		.controller('contentController', ['$scope','DataService', '$rootScope','$window',
			function($scope, DataService, $rootScope, $window){

				//$scope.totalItems = 0;
				$scope.currentPage = 1;
				$scope.maxSize = 11;

				$scope.list = new Array();
				var page = 0;
				var pageSize = 11;

				$scope.demo_base_url = "http://www.boluomi1314.com/demo/?pid=";

				$scope.getProductList = getProductList;
				$scope.deleteProduct = deleteProduct;
				$scope.goPage = goPage;
				$scope.transferTime = transferTime;
				$scope.getQRUrl = getQRUrl;
				$scope.preview = preview;

				init();

				$scope.$watch(function(){
					return $scope.currentPage;
				}, function(newValue, oldValue){
					getProductList(newValue - 1, pageSize);
				});

				function init(){
					//getProductList(0, pageSize);
				}



				function getProductList(page, pageSize){
					DataService.GetProductList(page, pageSize, function(response){
						if (response.success) {
							$scope.list = [];

							for(var i = 0; i<response.data.list.length; i++){
								var p = response.data.list[i];
								if(p.status >= 0){
									$scope.list.push(p);
								}
							}
							$scope.totalItems = response.data.totalCount;
							$scope.numPages = 5;
						}
					});
				}


				function deleteProduct(x){
					if (confirm("确认删除？")) {
						DataService.DelProduct(x.id, $rootScope.globals.authKey, function(response){
							if(response.success){
								alert("删除成功");
								var index = $scope.list.indexOf(x);
								$scope.list.splice(index, 1);
							}else{
								alert("删除失败");
							}
						});


					}
				}

				function preview(x){
					$window.open(getQRUrl(x));
				}
				function goPage(page){
					if(page>=0 && page<=Math.ceil($scope.totalItems/$scope.maxSize)){
						$scope.currentPage = page;
					}
				}
				function getQRUrl(x){
					return $scope.demo_base_url+ x.id;
				}
				function transferTime(x){
					return new Date(Date.parse(x));
				}
			}]);
})();