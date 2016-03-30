/**
 * Created by body7 on 11/6/15.
 */


(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('informationController', ['$scope', '$rootScope', 'Upload', '$timeout', 'DataService', '$window',
            'GeoCoderService','UtilsService','$state',
            function($scope, $rootScope, Upload, $timeout, DataService, $window, GeoCoderService, UtilsService, $state){


                var App = $rootScope.App;
                var uploadAPI = App.uploadAPI;
                var uploadFolder = App.uploadFolder;

                $scope.showModal = false;
                $scope.mapModalControl = {};
                $scope.smallMapControl = {};
                $scope.mapModalOpened = false;

                $scope.initController = initController;
                $scope.saveBrandInfo = saveBrandInfo;
                $scope.uploadSingleFile = uploadSingleFile;
                $scope.openMapModal = openMapModal;
                $scope.closeMapModal = closeMapModal;
                $scope.dismissMapModal = dismissMapModal;


                initController();

                function initController(){
                    $scope.division = UtilsService.getLinkCity();
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
                    $scope.merchant = merchant;
                    $scope.uploadOption = "logo";
                    $scope.smallMap = {
                        center: {
                            longitude: 116.404,
                            latitude: 39.915
                        },
                        zoom: 17,
                        city: "Beijing",
                        markers: [{
                            longitude: 116.404,
                            latitude: 39.915,
                            icon: 'img/mappiont.png',
                            width: 30,
                            height: 30,
                            title: 'Where',
                            content: 'Put description here'
                        }]
                    };
                    $scope.mapOptions = {
                        center: {
                            longitude: 116.404,
                            latitude: 39.915
                        },
                        zoom: 17,
                        city: "Beijing",
                        markers: [{
                            longitude: 116.404,
                            latitude: 39.915,
                            icon: 'img/mappiont.png',
                            width: 49,
                            height: 60,
                            //title: 'Where',
                            //content: 'Put description here'
                        }]
                    };

                    $scope.logoButton = "重新上传";
                    $scope.licenceButton = "重新上传";
                    $scope.uploadOption = "logo";
                    $scope.logo_process = 0;
                    $scope.licence_process = 0;

                    DataService.GetMerchantInfo(function(response){
                        if(response.success){
                            $scope.merchant = response.data.detail;

                            var location = {};
                            var l = $scope.merchant.location.split(',');
                            location.longitude = l[0];
                            location.latitude = l[1];

                            updateLocalMerchantInfo($scope.merchant);
                            updateSmallMap(location, $scope.merchant.city);
                            updateModalMap(location, $scope.merchant.city);
                        }else{
                            alert("error");
                        }
                    });
                }

                function updateLocalMerchantInfo(merchantInfo){
                    if(merchantInfo == null || merchantInfo == {}){
                        return;
                    }
                    var location = {};
                    var l = merchantInfo.location.split(',');
                    location.longitude = l[0];
                    location.latitude = l[1];

                    $scope.localMerchant = {
                        name:merchantInfo.name,
                        phone:merchantInfo.phone,
                        logo:merchantInfo.logo,
                        type:merchantInfo.type,
                        province:merchantInfo.province,
                        area:merchantInfo.area,
                        address:merchantInfo.address,
                        licence:merchantInfo.licence,
                        latitude: location.lat,
                        longitude: location.lng,
                        city: merchantInfo.city,
                        marked:true
                    }
                }
                function uploadSingleFile(file) {
                    if($scope.uploadOption == "logo"){
                        $scope.logo_process = 0;
                    }else{
                        $scope.licence_process = 0;
                    }
                    if (file) {
                        file.upload = Upload.upload({
                            url: uploadAPI,
                            data: {file: file}
                        });

                        file.upload.then(function (response) {
                            $timeout(function () {

                                if($scope.uploadOption == "logo"){
                                    $scope.localMerchant.logo = uploadFolder+response.data.url;
                                    $scope.logoButton = "上传成功";
                                    $scope.logo_process = 100;

                                }else{
                                    $scope.localMerchant.licence = uploadFolder+response.data.url;
                                    $scope.licenceButton = "上传成功";
                                    $scope.licence_process = 100;
                                }

                            });
                        }, function (response) {

                        }, function (evt) {
                            file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                            if($scope.uploadOption == "logo"){
                                $scope.logo_process = file.process;
                            }else{
                                $scope.licence_process = file.process;
                            }
                        });
                    }
                }

                function openMapModal(){
                    /*$scope.markOnMap = true;
                    if($scope.brandForm.address.$error.required!=null){
                        return;
                    }*/
                    GeoCoderService.getLocationByAddress($scope.localMerchant.city,$scope.localMerchant.address,
                        function(response){
                            if(response.success){
                                $scope.$apply(function(){
                                    var point = response.results.point;
                                    var location = {
                                        longitude:point.lng,
                                        latitude:point.lat
                                    };
                                    updateModalMap(location, $scope.localMerchant.city);
                                });
                            }else{
                                //alert(response.result);

                                $scope.$apply(function(){
                                    $scope.showModal = false;
                                    $scope.mapModalOpened = false;
                                })
                            }
                        });
                    $scope.mapModalOpened = true;
                    $scope.showModal = true;
                    $scope.mapModalControl.mark();
                }
                function closeMapModal(){

                    var location = {
                        longitude:$scope.mapOptions.markers[0].longitude,
                        latitude:$scope.mapOptions.markers[0].latitude
                    }

                    $scope.showModal = false;
                    $scope.localMerchant.latitude = location.latitude;
                    $scope.localMerchant.longitude = location.longitude;
                    $scope.localMerchant.marked = true;
                    updateSmallMap(location,$scope.localMerchant.city);
                }


                function dismissMapModal(){
                    $scope.showModal = false;
                    $scope.mapModalOpened = false;
                }

                function updateSmallMap(location,city){
                    $scope.smallMap= {
                        center: {
                            longitude: location.longitude,
                            latitude: location.latitude
                        },
                        zoom: 17,
                        city: city,
                        markers: [{
                            longitude: location.longitude,
                            latitude: location.latitude,
                            icon: 'img/mappiont.png',
                            width: 49,
                            height: 60,
                            title: 'Where',
                            content: 'Put description here'
                        }]
                    };
                }

                function updateModalMap(location,city) {
                    $scope.mapOptions = {
                        center: {
                            longitude: location.longitude,
                            latitude: location.latitude,
                        },
                        zoom: 17,
                        city: city,
                        markers: [{
                            longitude: location.longitude,
                            latitude: location.latitude,
                            icon: 'img/mappiont.png',
                            width: 49,
                            height: 60,
                            //title: 'Where',
                            //content: 'Put description here'
                        }]
                    };
                }

                function saveBrandInfo(){
                     $scope.merchant = {
                        name:$scope.localMerchant.name,
                        phone:$scope.localMerchant.phone,
                        logo:$scope.localMerchant.logo,
                        type:$scope.localMerchant.type,
                        province:$scope.localMerchant.province,
                        city:$scope.localMerchant.city,
                        area:$scope.localMerchant.area,
                        address:$scope.localMerchant.address,
                        licence:$scope.localMerchant.licence,
                        location:$scope.localMerchant.longitude + ',' + $scope.localMerchant.latitude
                    };
                    DataService.EditMerchant($scope.merchant, function(response){
                        if(response.success){
                            alert("保存成功");
                            $state.go('main.content');
                        }else{

                        }
                    });
                }


        }]);
})();
