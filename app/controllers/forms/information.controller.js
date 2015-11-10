/**
 * Created by body7 on 11/6/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('informationController', ['$scope', '$rootScope', 'Upload', '$timeout',function($scope, $rootScope, Upload, $timeout){

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
            $scope.logoButton = "上传";
            $scope.licenceButton = "上传";

            $scope.uploadOption = "logo";

            $scope.uploadSingleFile = function(file) {
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
            }


        }]);
})();