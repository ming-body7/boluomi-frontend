/**
 * Created by body7 on 15/12/9.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('GeoCoderService', GeoCoderService);

    GeoCoderService.$inject = ['$http', '$rootScope'];
    function GeoCoderService($http, $rootScope) {



        var service = {};
        var myGeo = new BMap.Geocoder();

        service.getAddressByLocation = getAddressByLocation;
        service.getLocationByAddress = getLocationByAddress;

        function getLocationByAddress(city, address, callback){
            myGeo.getPoint(address, function(point){
                if (point) {
                    callback({
                        success: true,
                        results: {point:point}
                    });
                }else{
                    callback({success: false, results: "您选择地址没有解析到结果!"});
                }
            }, city);
        }

        function getAddressByLocation(location, callback){
            myGeo.getLocation(new BMap.Point(location.longitude, location.latitude), function(result){
                if (result){
                    callback({
                        success: true,
                        results: {address:result.address}
                    });
                }else{
                    callback({success: false, results: "您选择地址没有解析到结果!"});
                }
            });
        }

        return service;

    }

})();