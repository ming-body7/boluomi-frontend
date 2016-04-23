/**
 * Created by body7 on 10/21/15.
 */
angular.module('myApp')
    .controller('modifiedController', ['$rootScope','$timeout','Upload','$scope','$state', '$stateParams','DataService', '$modal', '$window',
        function($rootScope, $timeout, Upload, $scope, $state, $stateParams, DataService, $modal, $window){

            var App = $rootScope.App;
            var uploadAPI = App.uploadAPI;
            var uploadFolder = App.uploadFolder;

            $scope.pid = $stateParams.pid;
            var pid = $scope.pid;
            $scope.baseUrl = "http://www.boluomi1314.com/upload/";

            $scope.product = {
                title:"",
                banner_pic: "",
                description: "",
                is_brand:1,
                is_home:0,
                music: "",
                change_status:0,
                pics:[]
            };

            $scope.$watch(function(){
                return $scope.product.is_brand;
            }, function(){
                $scope.product.is_brand = Number($scope.product.is_brand);
                console.log($scope.product.is_brand, typeof $scope.product.is_brand);
            },true);

            $scope.sortableOptions = {
                containment: '#sortable-container',
                //restrict move across columns. move only within column.
                accept: function (sourceItemHandleScope, destSortableScope) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                }
            };

            $scope.banner_progress = 0;
            $scope.music_progress = 0;
            $scope.music_uploading = false;

            $scope.saveButton = "保存";

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

            $scope.saveChanges = saveChanges;
            $scope.saveChangesAndExit = saveChangesAndExit;
            $scope.preview = preview;

            $scope.musicName = "";
            initProduct();

            if(pid != null){
                $scope.guideTitle = "作品";
                DataService.GetProductInfo(pid, function(response){
                    if (response.success) {

                        $scope.product = response.data.detail[0];

                        $scope.guideTitle = $scope.product.title;
                        if($scope.product.pics == null || $scope.product.pics == ""){
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
                $scope.product.is_brand = 1;
                $scope.product.is_home = 0;
                $scope.product.music = "";
                $scope.product.change_status = 0;
                $scope.product.pics = [];

                $scope.musicButton = "添加";
            }

            $scope.uploadMusic = function(music) {
                //$scope.product.music = music.name;
                $scope.music_progress = 0;
                $scope.music_uploading = false;
                if (music) {
                    music.upload = Upload.upload({
                        url: uploadAPI,
                        data: {file: music}
                    });

                    music.upload.then(function (response) {
                        $timeout(function () {
                            //file.result = response.data;
                            if(response.data.error == 1){
                                $scope.music_progress = 0;
                                $scope.music_uploading = false;
                                alert("上传失败，"+response.data.message);
                            }else{
                                $scope.product.music = uploadFolder+response.data.url;
                                $scope.musicButton = "更改";
                                $scope.musicName = music.name;
                                $scope.music_progress = 100;
                                $scope.music_uploading = false;
                                //alert("上传成功");
                            }

                        });
                    }, function (response) {
                        $scope.music_progress = 0;
                        $scope.music_uploading = false;
                    }, function (evt) {
                        music.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                        $scope.music_progress = music.progress;
                        $scope.music_uploading = true;
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
                        $scope.banner_progress = 1;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                        $scope.banner_progress = file.progress/100;
                    });
                }
            }

            function saveChanges(){

                $scope.saveButton = "保存中。。。";
                if($scope.product.is_brand == true){
                    $scope.product.is_brand = 1;
                }else{
                    $scope.product.is_brand = 0;
                }

                if(pid != null){
                    DataService.EditProduct(pid, $rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //$state.go('main.content');
                            alert("保存成功！");

                        }
                        $scope.saveButton = "保存";
                    });
                }else{
                    DataService.AddProduct($rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //$state.go('main.content');
                            pid = response.data.id;
                            alert("保存成功！");

                        }
                        $scope.saveButton = "保存";
                    });
                }

            }

            function saveChangesAndExit(){
                saveChanges();
                $state.go('main.content');
            }

            function preview(){
                /*if($scope.product.is_brand == true){
                    $scope.product.is_brand = 1;
                }else{
                    $scope.product.is_brand = 0;
                }

                DataService.AddProduct($rootScope.globals.authKey, $scope.product, function(response){
                    if(response.success){
                        //
                        pid = response.data.id;
                        //alert("生成成功！");
                        $rootScope.previewPid = pid;
                        $state.go('preview',{pid:pid});
                    }else{
                        alert("生成失败");
                    }
                });*/
                $scope.saveButton = "保存中。。。";
                if($scope.product.is_brand == true){
                    $scope.product.is_brand = 1;
                }else{
                    $scope.product.is_brand = 0;
                }

                if(pid != null){
                    DataService.EditProduct(pid, $rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //$state.go('main.content');
                            alert("保存成功！");
                            openPreviewTab(pid);

                        }
                        $scope.saveButton = "保存";
                    });
                }else{
                    DataService.AddProduct($rootScope.globals.authKey, $scope.product, function(response){
                        if(response.success){
                            //$state.go('main.content');
                            pid = response.data.id;
                            alert("保存成功！");
                            openPreviewTab(pid);
                        }
                        $scope.saveButton = "保存";
                    });
                }
            }

            function openPreviewTab(pid){
                $window.open('http://www.boluomi1314.com/demo/pc/web_share.html?pid='+pid);
            }


            $scope.upload = function (file, errFiles) {
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    var new_pic = "img/default_img.png";
                    $scope.product.pics.push(new_pic);

                    file.upload = Upload.upload({
                        url: uploadAPI,
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    });

                    file.upload.progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.data.file.name + '\n' + $scope.log;
                        $scope.percent = progressPercentage;
                        $scope.uploading = true;
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                            $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.product.pics[$scope.product.pics.length - 1] = uploadFolder+data.url;
                            $scope.uploading = false;
                        });
                    });
                }
            };


            //pic upload
            $scope.progress = [];
            $scope.uploading = [];


            $scope.uploadFiles = function(files, errFiles) {
                $scope.files = files;
                $scope.errFiles = errFiles;

                var pics_length = $scope.product.pics.length;

                angular.forEach(files, function(file, index) {
                    var new_pic = "img/1.jpg";
                    var new_progress = 0;
                    var uploading = false;
                    $scope.product.pics.push(new_pic);
                    $scope.progress.push(new_progress);
                    $scope.uploading.push(uploading);

                    file.upload = Upload.upload({
                        url: uploadAPI,
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    });

                    file.upload.then(function (response) {
                        //success
                        $timeout(function () {
                            $scope.product.pics[pics_length + index] = uploadFolder+response.data.url;
                            $scope.uploading[pics_length + index] = false;
                        });
                    }, function (response) {
                        //error
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                        $scope.progress[pics_length + index] = progressPercentage;
                        $scope.uploading[pics_length + index] = true;
                    });
                });
            }
        }]);