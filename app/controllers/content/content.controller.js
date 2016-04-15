angular.module('myApp')
	.controller('contentController', ['$scope','DataService', '$rootScope',function($scope, DataService, $rootScope){

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 8;

		$scope.list = new Array();
		var page = 0;
		var pageSize = 10;

		$scope.demo_base_url = "http://www.boluomi1314.com/demo/?pid=";
		$scope.deleteProduct = deleteProduct;
		$scope.goPage = goPage;
		$scope.transferTime = transferTime;
		$scope.getQRUrl = getQRUrl;


		DataService.GetProductList(page, pageSize, function(response){
			if (response.success) {
				for(i = 0; i<response.data.list.length; i++){
					var p = response.data.list[i];
					if(p.status >= 0){
						$scope.list.push(p);
					}
				}
				//$scope.list = response.data.list;

				//$scope.totalItems = response.data.totalCount;
				$scope.totalItems = $scope.list.length;
			}
		});

		function deleteProduct(x){
			if (confirm("确认删除？")) {
				//TODO: 服务器端删除
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

		function goPage(page){
			if(page>=0 && page<($scope.totalItems/$scope.maxSize)){
				$scope.currentPage = page;
			}

		}
		function getQRUrl(x){
			return $scope.demo_base_url+ x.id;
		}
		function transferTime(x){
			/*var today = new Date();
			var time = new Date(Date.parse(x));
			var isSameDay = (today.getDate() == time.getDate()
			&& today.getMonth() == time.getMonth()
			&& today.getFullYear() == time.getFullYear())
			if(isSameDay){
				return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			}else{
				return time.getFullYear()+'-'+time.getMonth()+'-'+time.getDay();
			}*/
			return new Date(Date.parse(x));


		}
	}]);