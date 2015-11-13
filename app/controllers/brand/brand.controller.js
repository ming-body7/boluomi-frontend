/**
 * Created by body7 on 11/1/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('brandController', ['$scope', '$rootScope', 'Upload', '$timeout','DataService','$state',
            function($scope, $rootScope, Upload, $timeout, DataService, $state){

            var App = $rootScope.App;
            var uploadAPI = App.uploadAPI;
            var uploadFolder = App.uploadFolder;
            var merchant = {
                name:"",
                phone:"",
                logo:"",
                type:0,
                province:"test",
                city:"test",
                area:"test",
                address:"",
                licence:"",
                location:"100，100"
            };

            $scope.merchant = merchant;
            $scope.logoButton = "上传";
            $scope.licenceButton = "上传";
            $scope.uploadOption = "logo";

            $scope.addBrandInfo = addBrandInfo;
            $scope.setLocation = setLocation;

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
                function addBrandInfo(){
                    DataService.AddMerchant($scope.merchant, function(response){
                        if(response.success){
                            $state.go('audit');
                        }else{

                        }
                    });
                }


        }]);


})();