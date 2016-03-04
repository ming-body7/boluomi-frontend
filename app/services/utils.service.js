/**
 * Created by body7 on 16/3/3.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('UtilsService', GeoCoderService);

    UtilsService.$inject = ['$rootScope'];
    function UtilsService($rootScope) {



        var service = {};
        service.isMobile = isMobile;
        service.isEmpty = isEmpty;

        return service;

        function isMobile(txt){
            return /^1{1}[3-9]{1}[0-9]{9}$/.test(txt);
        }

        function isEmpty(val){
            var re = /\S/;
            if(re.test(val)){//有内容
                return false;
            };
            return true;//没有内容或输入的是空格
        }
    }

})();