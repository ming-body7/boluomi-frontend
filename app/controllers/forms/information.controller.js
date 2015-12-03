/**
 * Created by body7 on 11/6/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('informationController', ['$scope', '$rootScope', 'Upload', '$timeout', 'DataService', '$window',
            function($scope, $rootScope, Upload, $timeout, DataService, $window){

            var App = $rootScope.App;
            var uploadAPI = App.uploadAPI;
            var uploadFolder = App.uploadFolder;

            var merchant = {
                name:"",
                phone:"",
                logo:"",
                type:0,
                province:"",
                city:"",
                area:"",
                address:"",
                licence:"",
                location:""
            };


            var baseUrl = "http://boluomi.dev:8083/data/upload/";
            $scope.merchant = merchant;
            $scope.logoButton = "更改";
            $scope.licenceButton = "更改";
            $scope.uploadOption = "logo";

            $scope.saveBrandInfo = saveBrandInfo;
            $scope.setLocation = setLocation;

            DataService.GetMerchantInfo(function(response){
                if(response.success){
                    $scope.merchant = response.data.detail;

                }else{

                }
            });
            /*$scope.uploadSingleFile = function(file) {
                //$scope.product.music = music.name;
                if (file) {
                    file.upload = Upload.upload({
                        url: 'http://boluomi.dev:8083/upload.php',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            //file.result = response.data;
                            if($scope.uploadOption == "logo"){
                                $scope.merchant.logo = baseUrl+response.data.url;
                                $scope.logoButton = "上传成功";
                            }else{
                                $scope.merchant.licence = baseUrl+response.data.url;
                                $scope.licenceButton = "上传成功";
                            }


                        });
                    }, function (response) {
                        //$scope.product.banner_pic = baseUrl+response.data.url;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            }  */
                $scope.uploadSingleFile = function(file) {

                    if (file) {
                        file.upload = Upload.upload({
                            url: uploadAPI,
                            data: {file: file}
                        });

                        file.upload.then(function (response) {
                            $timeout(function () {

                                if($scope.uploadOption == "logo"){
                                    $scope.merchant.logo = uploadFolder+response.data.url;
                                    $scope.logoButton = "上传成功";

                                }else{
                                    $scope.merchant.licence = uploadFolder+response.data.url;
                                    $scope.licenceButton = "上传成功";
                                }


                            });
                        }, function (response) {

                        }, function (evt) {
                            file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                        });
                    }
                }

                function setLocation(location){
                    $scope.merchant.location = location;
                }
                function saveBrandInfo(){
                    DataService.EditMerchant($scope.merchant, function(response){
                        if(response.success){
                            alert("保存成功");
                        }else{

                        }
                    });
                }


        }]);
})();