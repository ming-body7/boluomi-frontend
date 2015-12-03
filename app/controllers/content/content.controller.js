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
		$scope.transferTime = transferTime;


		DataService.GetProductList(page, pageSize, function(response){
			if (response.success) {
				$scope.list = response.data.list;
				$scope.totalItems = response.data.totalCount;
			}
		});

		function deleteProduct(x){
			if (confirm("确认删除？")) {
				//TODO: 服务器端删除
				var index = $scope.list.indexOf(x);
				$scope.list.splice(index, 1);
			}
		}

		function goPage(page){
			if(page>=0 && page<($scope.totalItems/$scope.maxSize)){
				$scope.currentPage = page;
			}

		}

		function transferTime(x){
			var today = new Date();
			var time = new Date(Date.parse(x));
			var isSameDay = (today.getDate() == time.getDate()
			&& today.getMonth() == time.getMonth()
			&& today.getFullYear() == time.getFullYear())
			if(isSameDay){
				return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			}else{
				return time.getFullYear()+'-'+time.getMonth()+'-'+time.getDay();
			}

		}
	}]);