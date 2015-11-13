/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('modifiedController', ['$rootScope','$timeout','Upload','$scope','$state', '$stateParams','DataService',function($rootScope, $timeout, Upload, $scope, $state, $stateParams, DataService){

        var pid = $stateParams.pid;

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


        $scope.musicName = "";
        initProduct();

        if(pid != null){
            DataService.GetProductInfo(pid, function(response){
                if (response.success) {
                    $scope.product = response.data.detail[0];
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
        }

        function initProduct(){
            $scope.product.title = "快给作品起个名字吧";
            $scope.product.banner_pic = "images/create/default-cover.png";
            $scope.product.description = "加点摘要说明，发送到朋友圈，点开的可能性更大哟~";
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


        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
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
            if($scope.product.is_brand == true){
                $scope.product.is_brand = 1;
            }else{
                $scope.product.is_brand = 0;
            }

            if(pid != null){
                DataService.EditProduct(pid, $rootScope.globals.authKey, $scope.product, function(response){
                    if(response.success){
                        $state.go('main');
                    }
                });
            }else{
                DataService.AddProduct($rootScope.globals.authKey, $scope.product, function(response){
                    if(response.success){
                        $state.go('main');
                    }
                });
            }

        }

        function abortChanges(){
            //delete uploaded pic
        }

        function preview(){

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
                        }).success(function (data, status, headers, config) {
                            $timeout(function() {
                                $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;

                                $scope.product.pics.push(uploadFolder+data.url);
                            });
                        });
                    }
                }
            }
        };


    }]);