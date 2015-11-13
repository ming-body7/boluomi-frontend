/**
 * Created by body7 on 9/29/15.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('DataService', DataService);

    DataService.$inject = ['$rootScope', '$http'];
    function DataService($rootScope ,$http) {

        var App = $rootScope.App;
        var baseUrl = App.baseUrl;

        var service = {};
        service.GetProductList = GetProductList;
        service.GetProductInfo = GetProductInfo;
        service.EditProduct = EditProduct;
        service.AddProduct = AddProduct;
        service.AddMerchant = AddMerchant;
        service.GetMerchantInfo = GetMerchantInfo;
        service.EditMerchant = EditMerchant;
        return service;

        function GetProductList(page, pageSize, callback){


            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/list',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //withCredentials: true,
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

        function GetMerchantInfo(callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/business/view',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        function AddMerchant(merchant, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/business/add',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    status:0,
                    id:$rootScope.globals.id,
                    auth_key:$rootScope.globals.authKey,
                    name:merchant.name,
                    phone:merchant.phone,
                    logo:merchant.logo,
                    type:merchant.type,
                    province:merchant.province,
                    city:merchant.city,
                    area:merchant.area,
                    address:merchant.address,
                    licence:merchant.licence,
                    location:merchant.location
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });


        }

        function EditMerchant(merchant, callback){
            $http({
                method: 'POST',
                url: baseUrl+'/v1/business/add',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    status:0,
                    auth_key:$rootScope.globals.authKey,
                    id:$rootScope.globals.id,
                    name:merchant.name,
                    phone:merchant.phone,
                    logo:merchant.logo,
                    type:merchant.type,
                    province:merchant.province,
                    city:merchant.city,
                    area:merchant.area,
                    address:merchant.address,
                    licence:merchant.licence,
                    location:merchant.location
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }
        function GetProductInfo(pid, callback){

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

        function AddProduct(authKey, product, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/add',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {auth_key:authKey, title:product.title, banner_pic:product.banner_pic,
                    description:product.description,
                    is_brand:product.is_brand,
                    is_home:product.is_home,
                    music:product.music,
                    change_status:product.change_status,
                    pics:product.pics.toString()
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });


        }

        function EditProduct(pid, authKey, product, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/edit',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {pid: pid, auth_key:authKey, title:product.title, banner_pic:product.banner_pic,
                        description:product.description,
                        is_brand:product.is_brand,
                        is_home:product.is_home,
                        music:product.music,
                        change_status:product.change_status,
                        pics:product.pics.toString()
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

    }

})();