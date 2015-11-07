/**
 * Created by body7 on 9/29/15.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('AdminService', AdminService);

    DataService.$inject = ['$rootScope', '$http'];
    function AdminService($rootScope ,$http) {

        var baseUrl = "http://frontend.dev:7888/boluomi/frontend/web/index.php";


        var service = {};
        service.GetMerchantList = GetMerchantList;
        service.GetProductList = GetProductList;
        service.GetProductInfo = GetProductInfo;
        return service;

        function GetMerchantList(page, pageSize, callback){


            $http({
                method: 'POST',
                url: baseUrl+'manager//business/list',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {page:page, pageSize:pageSize}
            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });


        }

        function GetProductList(page, pageSize, callback){


            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/list',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {page:page, pageSize:pageSize}
            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });


        }

        function GetMerchanInfo(id, callback){
            $http.post('http://boluomi.rjl.com/v1/business/view', id)
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });
        }

        function AddMerchant(merchant, callback){
            $http.post('http://boluomi.rjl.com/v1/business/add', merchant)
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });
        }

        function GetProductInfo(pid, callback){
            $http.post(baseUrl+'/v1/product/view', pid)
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });
            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/view',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {pid:pid}
            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });


        }

        function AddProduct(product, callback){
            $http.post('http://boluomi.rjl.com/v1/product/add', product)
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });
        }

        function EditProduct(product, callback){
            $http.post('http://boluomi.rjl.com/v1/product/edit', product)
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });
        }

    }

})();/**
 * Created by body7 on 10/22/15.
 */
