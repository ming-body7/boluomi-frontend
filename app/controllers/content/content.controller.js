angular.module('myApp')
	.controller('contentController', ['$scope','DataService',function($scope, DataService){

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 8;

		$scope.list = {};
		var page = 0;
		var pageSize = 10;


		$scope.deleteProduct = deleteProduct;
		DataService.GetProductList(page, pageSize, function(response){
			if (response.success) {
				$scope.list = response.data.list;
				$scope.totalItems = response.data.totalCount;
			}
		});

		function deleteProduct(x){
			var index = $scope.list.indexOf(x);
			$scope.list.splice(index, 1);


		}
	}]);