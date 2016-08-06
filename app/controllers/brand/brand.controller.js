/**
 * Created by body7 on 11/1/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('brandController', ['$scope', '$rootScope', 'Upload', '$timeout','DataService','$state','GeoCoderService','UtilsService', 'AuthenticationService',
            function($scope, $rootScope, Upload, $timeout, DataService, $state, GeoCoderService, UtilsService, AuthenticationService){

                var App = $rootScope.App;
                var uploadAPI = App.uploadAPI;
                var uploadFolder = App.uploadFolder;


                $scope.showModal = false;
                $scope.mapModalControl = {};
                $scope.smallMapControl = {};
                $scope.mapModalOpened = false;

                $scope.initController = initController;
                $scope.addBrandInfo = addBrandInfo;
                $scope.uploadSingleFile = uploadSingleFile;
                $scope.openMapModal = openMapModal;
                $scope.closeMapModal = closeMapModal;
                $scope.dismissMapModal = dismissMapModal;

                initController();

                function initController(){
                    $scope.division = UtilsService.getLinkCity();
                    $scope.submitted = false;
                    $scope.merchant = {
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
                    $scope.localMerchant = {
                        name:"",
                        phone:"",
                        logo:"",
                        type:"",
                        province:"",
                        area:"",
                        address:"",
                        licence:"",
                        latitude: 39.915,
                        longitude: 116.404,
                        city: "Beijing",
                        marked:false,
                        url:""
                    };

                    $scope.logoButton = "上传";
                    $scope.licenceButton = "上传";
                    $scope.mapButton = "标注";
                    $scope.uploadOption = "logo";
                    $scope.logo_process = 0;
                    $scope.licence_process = 0;
                    $scope.logo_uploading = false;
                    $scope.licence_uploading = false;

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


                            if($scope.uploadOption == "logo"){
                                $scope.localMerchant.logo = uploadFolder+response.data.url;
                                $scope.logoButton = "重新上传";
                                $scope.logo_process = 100;
                                $scope.logo_uploading = false;

                            }else{
                                $scope.localMerchant.licence = uploadFolder+response.data.url;
                                $scope.licenceButton = "重新上传";
                                $scope.licence_process = 100;
                                $scope.licence_uploading = false;
                            }
                 }, function (response) {

                        }, function (evt) {
                            file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                            if($scope.uploadOption == "logo"){
                                $scope.logo_process = file.process;
                                $scope.logo_uploading = true;
                            }else{
                                $scope.licence_process = file.process;
                                $scope.licence_uploading = true;
                            }
                        });
                    }
                }

                function addBrandInfo(){
                    $scope.submitted = true;
                    if(!(Object.keys($scope.brandForm.$error).length == 0)){
                        return;
                    }
                    if($scope.localMerchant.logo == ""){
                        return;
                    }
                    // if($scope.localMerchant.licence == ""){
                    //     return;
                    // }
                    if(!$scope.localMerchant.marked){
                        return;
                    }
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
                        location:$scope.localMerchant.longitude + ',' + $scope.localMerchant.latitude,
                        url:$scope.localMerchant.url
                    };
                    DataService.AddMerchant($scope.merchant, function(response){
                        if(response.success){
                            AuthenticationService.SetCredentials($rootScope.globals.account, $rootScope.globals.authKey, $rootScope.globals.id, 'user.audit',10);
                            $state.go('audit');
                        }else{
                            //品牌信息修改失败callback
                            alert("error");
                        }
                    });
                }



                function openMapModal(){
                    $scope.markOnMap = true;
                    if($scope.brandForm.address.$error.required!=null){

                        return;
                    }
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

                    $scope.mapButton = "重新标注";
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
                            //title: 'Where',
                            //content: 'Put description here'
                        }]
                    };
                }

            }]);
})();