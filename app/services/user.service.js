(function () {
    'use strict';
 
    angular
        .module('myApp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http', '$rootScope'];
    function UserService($http, $rootScope) {

        var App = window.App;
        var baseUrl = App.baseUrl;


        var service = {};
        service.accessLevel = '';
        service.Create = Create;
        service.getAccessLevel = getAccessLevel;
        service.setAccessLevel = setAccessLevel;

        return service;

        function Create(user, callback) {
            $http({
                method: 'POST',
                url: baseUrl+'/v1/register/signup',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {account:user.account, code:user.code, password:user.password, repassword:user.rePassword}
            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        function getAccessLevel(){
            return service.accessLevel;
        }
        function setAccessLevel(accessLevel){
            service.accessLevel = accessLevel;
            $rootScope.admin = true;
        }

    }
 
})();