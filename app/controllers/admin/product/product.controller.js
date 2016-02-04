/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('productController', ['$rootScope','$timeout','Upload','$scope','$state', '$stateParams','DataService', '$modal', '$log',
        function($rootScope, $timeout, Upload, $scope, $state, $stateParams, DataService, $modal, $log){


            $scope.sortableOptions = {
                containment: '#sortable-container',
                //restrict move across columns. move only within column.
                accept: function (sourceItemHandleScope, destSortableScope) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                }
            };




            var product_id = $stateParams.product_id;

            //TODO: product_id方法更改为admin方法

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

            $scope.product = {};
            $scope.baseUrl = "http://www.boluomi1314.com/upload/";

            var App = $rootScope.App;
            var uploadAPI = App.uploadAPI;
            var uploadFolder = App.uploadFolder;

            $scope.saveChanges = saveChanges;
            $scope.saveChangesAndExit = saveChangesAndExit;

            $scope.musicName = "";
            initProduct();

            if(product_id != null){
                $scope.guideTitle = "作品";
                DataService.GetProductInfo(product_id, function(response){
                    if (response.success) {

                        $scope.product = response.data.detail[0];

                        $scope.guideTitle = $scope.product.title;
                        if($scope.product.pics == null){
                            $scope.product.pics = [];
                        }else{
                            var pics = $scope.product.pics.split(",");
                            $scope.product.pics = pics;
                        }


                        if($scope.product.is_brand == 1){
                            $scope.product.is_brand = true;
                        }else{
                            $scope.product.is_brand = false;
                        }
                        if($scope.product.music!=null && $scope.product.music != ""){
                            $scope.musicButton = "更改";
                            $scope.musicName =  $scope.product.music.replace(/^.*[\\\/]/, '')
                        }
                    }
                });
            }else{
                $scope.guideTitle = "新建";
            }


            function deletePic(pic){
                var index = $scope.product.pics.indexOf(pic);
                if (index > -1) {
                    $scope.product.pics.splice(index, 1);
                }
            }
            function initProduct(){
                $scope.product.title = "";
                $scope.product.banner_pic = "img/default-cover.png";
                $scope.product.description = "";
                $scope.product.is_brand = 0;
                $scope.product.is_home = 0;
                $scope.product.music = "";
                $scope.product.change_status = 0;
                $scope.product.pics = [];

                $scope.musicButton = "添加";
            }

            $scope.uploadMusic = function(music) {
                //$scope.product.music = music.name;
                if (music) {
                    music.upload = Upload.upload({
                        url: uploadAPI,
                        data: {file: music}
                    });

                    music.upload.then(function (response) {
                        $timeout(function () {
                            //file.result = response.data;
                            $scope.product.music = uploadFolder+response.data.url;
                            $scope.musicButton = "更改";
                            $scope.musicName = music.name;
                        });
                    }, function (response) {
                        //$scope.product.banner_pic = baseUrl+response.data.url;
                    }, function (evt) {
                        music.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            }

            $scope.validate = function(music){
                if(music.type!="audio/mp3"){
                    alert("请上传MP3格式的音乐");
                    return false;
                }
            }

            $scope.uploadFiles = function(file, errFiles) {
                $scope.f = file;

                $scope.errFile = errFiles && errFiles[0];
                if($scope.errFile){
                    alert("图片超过大小");
                }

                if (file) {
                    file.upload = Upload.upload({
                        url: uploadAPI,
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            //file.result = response.data;
                            $scope.product.banner_pic = uploadFolder+response.data.url;
                        });
                    }, function (response) {

                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            }

            function saveChanges(){

                //TODO:add product返回product_id

                if($scope.product.is_brand == true){
                    $scope.product.is_brand = 1;
                }else{
                    $scope.product.is_brand = 0;
                }

                if(product_id != null){
                    DataService.AdminEditProduct(product_id, $scope.product, function(response){
                        if(response.success){
                            //$state.go('main');
                            alert("保存成功！");

                        }
                    });
                }

            }

            function saveChangesAndExit(){
                if($scope.product.is_brand == true){
                    $scope.product.is_brand = 1;
                }else{
                    $scope.product.is_brand = 0;
                }

                if(product_id != null){
                    DataService.EditProduct(product_id, $rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //
                            alert("保存成功！");
                            $state.go('main');

                        }
                    });
                }else{
                    DataService.AddProduct($rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //
                            product_id = response.data.id;
                            alert("保存成功！");
                            $state.go('main');
                        }
                    });
                }
            }



            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            $scope.$watch('file', function () {
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });


            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            var new_pic = {};
                            $scope.product.pics.push(new_pic);
                            Upload.upload({
                                url: uploadAPI,
                                data: {
                                    username: $scope.username,
                                    file: file
                                }
                            }).progress(function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                $scope.log = 'progress: ' + progressPercentage + '% ' +
                                    evt.config.data.file.name + '\n' + $scope.log;
                                $scope.percent = progressPercentage + "%";
                            }).success(function (data, status, headers, config) {
                                $timeout(function() {
                                    $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;

                                    //$scope.product.pics.push(uploadFolder+data.url);
                                    $scope.product.pics[$scope.product.pics.length - 1] = uploadFolder+data.url;
                                });
                            });
                        }
                    }
                }
            };


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

            //TODO: update function for product
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

            //modal related code
            /*$scope.items = ['item1', 'item2', 'item3'];

             $scope.animationsEnabled = true;

             $scope.open = function (size) {

             var modalInstance = $modal.open({
             animation: $scope.animationsEnabled,
             templateUrl: 'myModalContent.html',
             controller: 'ModalInstanceCtrl',
             size: size,
             resolve: {
             items: function () {
             return $scope.items;
             }
             }
             });

             modalInstance.result.then(function (selectedItem) {
             $scope.selected = selectedItem;
             }, function () {
             $log.info('Modal dismissed at: ' + new Date());
             });
             };

             $scope.toggleAnimation = function () {
             $scope.animationsEnabled = !$scope.animationsEnabled;
             };  */

        }]);

/*
 angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

 $scope.items = items;
 $scope.selected = {
 item: $scope.items[0]
 };

 $scope.ok = function () {
 $modalInstance.close($scope.selected.item);
 };

 $scope.cancel = function () {
 $modalInstance.dismiss('cancel');
 };
 });
 */