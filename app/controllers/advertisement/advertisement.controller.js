
/**
 * Created by body7 on 11/6/15.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('advertisementController', ['$scope', '$rootScope', 'Upload', '$timeout', 'DataService',
            function($scope, $rootScope, Upload, $timeout, DataService){



                var baseUrl = "http://boluomi.dev:8083/data/upload/";
                $scope.saveBrandInfo = saveAdInfo;

                $scope.uploadSingleFile = function(file) {

                    if (file) {
                        file.upload = Upload.upload({
                            url: 'http://boluomi.dev:8083/upload.php',
                            data: {file: file}
                        });

                        file.upload.then(function (response) {
                            $timeout(function () {
                                //file.result = response.data;

                                alert("上传成功！");
                            });
                        }, function (response) {
                            //$scope.product.banner_pic = baseUrl+response.data.url;
                        }, function (evt) {
                            file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                        });
                    }
                }


                function saveAdInfo(){
                    DataService.EditMerchant($scope.merchant, function(response){
                        if(response.success){
                            alert("保存成功");
                        }else{

                        }
                    });
                }


            }]);
})();