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
            $scope.getLocation = getLocation;



                DataService.GetMerchantInfo(function(response){
                if(response.success){
                    $scope.merchant = response.data.detail;
                    getLocation();
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

                function getLocation(){

                    //这一段是JS代码
                    var location = {};
                    var l = $scope.merchant.location.split(',');
                    location.lng = l[0];
                    location.lat = l[1];
                    var map2 = new BMap.Map("smallMap");          // 创建地图实例
                    var point2 = new BMap.Point(location.lng, location.lat);  // 创建点坐标
                    //map2.centerAndZoom(location, 15);                 // 初始化地图，设置中心点坐标和地图级别
                    //var point2 = new BMap.Point(117.331398,39.897445);
                    var gc = new BMap.Geocoder();
                    // myGeo = new BMap.Geocoder();
                    //获取地址的数据地址
                    gc.getLocation(point2, function(rs) {
                        var addcomp = rs.addressComponents;
                        //var city = addcomp.province + addcomp.city + addcomp.district + addcomp.street + addcomp.streetnumber;
                        var city = addcomp.city;
                        map2.centerAndZoom(point2, 15);
                        map2.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
                        //var final_marker = new BMap.Marker(location);
                        var final_marker = new BMap.Marker(point2);
                        map2.addOverlay(final_marker);
                    });



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