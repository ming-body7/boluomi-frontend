(function($angular) {

    $angular.module('myApp').controller('createController', ['Upload','$scope', '$timeout', 'DataService', function createController(Upload, $scope,  $timeout, DataService) {

        var product = {};

        product.title = "你是我一生的守候";
        product.banner_pic = "img/default-cover.png";
        product.description = "赵奋斗&李美丽";
        product.is_brand = 1;
        product.is_home = 0;
        product.music = "";
        product.change_status = 0;
        product.pics = [];

        //pics: 缩略图url, 正图url,
        $scope.product = product;

        $scope.options = [{
            name: '上下切换',
            value: 0
        }, {
            name: '折叠切换',
            value: 1
        }, {
            name: '立体切换',
            value: 2
        }];

        var pid = 0;
        /*DataService.GetProductInfo(pid, function(response){
            if (response.success) {
                $scope.prodcut = response.data.detail;
            }
        });*/



        $scope.$watch('files', function () {
            $scope.upload($scope.files);
            });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                            data: {
                                username: $scope.username,
                                file: file
                            }
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.data.file.name + '\n' + $scope.log;
                        }).success(function (data, status, headers, config) {
                            $timeout(function() {
                                $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                            });
                        });
                    }
                }
            }
        };


    }]);

})(window.angular);