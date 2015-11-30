angular.module('myApp')
	.controller('contentController', ['$scope','DataService',function($scope, DataService){

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 8;

		$scope.list = {};
		var page = 0;
		var pageSize = 10;


		$scope.deleteProduct = deleteProduct;
		$scope.goPage = goPage;
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

		function goPage(page){
			if(page>=0 && page<($scope.totalItems/$scope.maxSize)){
				$scope.currentPage = page;
			}

		}
	}]);