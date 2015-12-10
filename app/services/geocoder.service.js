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

        service.geocode=function(point, outerCallback) {
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(point, function(rs){//通过经纬度解析地址
                if(rs){
                    var addComp = rs.addressComponents;
                    //address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
                    outerCallback({
                        success: true,
                        results: {city:addComp.city}
                    });
                }else{
                    outerCallback({success: false, results: "您选择地址没有解析到结果!"});
                }

            });
        };
        return service;

    }

})();