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

        var App = window.App;
        var baseUrl = App.baseUrl;
        var adminBaseUrl = "http://www.boluomi1314.com:8082";
        //var adminBaseUrl = "http://boluomi.dev:8082";

        var service = {};
        service.GetProductList = GetProductList;
        service.GetProductInfo = GetProductInfo;

        service.AddProduct = AddProduct;
        service.EditProduct = EditProduct;
        service.DelProduct = DelProduct;

        service.GetMerchantInfo = GetMerchantInfo;
        service.AddMerchant = AddMerchant;
        service.EditMerchant = EditMerchant;


        /***
         *
         * @admin
         */
        service.AdminGetProductList = AdminGetProductList;
        service.AdminGetProductInfo = AdminGetProductInfo;

        service.AdminEditProduct = AdminEditProduct;
        //service.AdminAddProduct = AdminAddProduct;
        service.AdminDelProduct = AdminDelProduct;

        service.AdminGetMerchantList = AdminGetMerchantList;
        service.AdminGetMerchantInfo = AdminGetMerchantInfo;
        //service.AdminAddMerchant = AdminAddMerchant;
        service.AdminEditMerchant = AdminEditMerchant;
        service.AdminAuditMerchant = AdminAuditMerchant;
        service.AdminAuditProduct = AdminAuditProduct;

        return service;

        /***
         * @user function
         *
         *
         *
         *
         */
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
        function DelProduct(pid, authKey, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/del',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    pid: pid,
                    auth_key:authKey
                }

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
                    location:merchant.location,
                    url:merchant.url
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
                    location:merchant.location,
                    url:merchant.url
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        /***
         *@admin function
         */
        function AdminGetProductList(page, pageSize, callback){


            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/product/list',
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
        function AdminGetProductInfo(pid, callback){

            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/product/view',
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
        /*function AdminAddProduct(authKey, product, callback){

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


        }*/
        function AdminEditProduct(pid, product, callback){

            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/product/edit',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {pid: pid,
                    title:product.title,
                    banner_pic:product.banner_pic,
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
        function AdminDelProduct(pid, authKey, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/product/del',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    pid: pid,
                    auth_key:authKey
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }


        function AdminGetMerchantList(page, pageSize, callback){
            $http({
                method: 'GET',
                url: adminBaseUrl+"/manager/business/list",
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
        function AdminGetMerchantInfo(merchantId, callback){
            $http({
                method: 'POST',
                url: adminBaseUrl+"/manager/business/view",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {id:merchantId}

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }
        /*function AdminAddMerchant(merchant, callback){

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


        }*/
        function AdminEditMerchant(merchant, callback){
            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/business/edit',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id:merchant.id,
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
        function AdminAuditMerchant(merchant_id, merchant_status, callback){
            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/business/audit',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id:merchant_id,
                    status:merchant_status
                }

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        function AdminAuditProduct(product_id, product_status, callback){
            $http({
                method: 'POST',
                url: adminBaseUrl+'/manager/product/audit',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    pid:product_id,
                    status:product_status
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