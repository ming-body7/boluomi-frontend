(function () {
    'use strict';
 
    angular
        .module('myApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope'];
    function AuthenticationService($http, $cookies, $rootScope) {

        var App = window.App;
        var baseUrl = App.baseUrl;

        var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ResetPassword = ResetPassword;
        service.UpdatePassword = UpdatePassword;
        service.ResetAccount = ResetAccount;
        service.GetCode = GetCode;
        service.IsSessionExpired = IsSessionExpired;
        service.GetCredentials = GetCredentials;
        service.SendHttpRequest = SendHttpRequest;

        return service;
 
        function Login(account, password, rememberMe, callback) {
            $http({
                method: 'POST',
                url: baseUrl+'/v1/register/login',
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {account: account, password: password, rememberMe: rememberMe}
            }).success(function (response) {
                if(response.type == 0){
                    callback({success: false, data: response.msg});
                }else{
                    callback({success: true, data:response.result});
                }
            });

        }

        function Logout(callback) {
            var data = {};
            var extendUrl = '/v1/register/logout';
            SendHttpRequest(data, extendUrl, callback);
        }




        function ResetPassword(account, code, password, rePassword, callback){
            var data = {account: account, code:code, password: password, repassword:rePassword};
            var extendUrl = '/v1/register/resetpassword';
            SendHttpRequest(data, extendUrl, callback);
        }

        function UpdatePassword(auth_key, oldpassword, newpassword, renewpassword, callback){
            var data = {auth_key:auth_key, oldpassword:oldpassword, newpassword:newpassword, renewpassword:renewpassword};
            var extendUrl = '/v1/register/updatepassword';
            SendHttpRequest(data, extendUrl, callback);
        }

        function ResetAccount(auth_key, password, newaccount, code, callback){
            var data = {auth_key:auth_key, password:password, newaccount:newaccount, code:code};
            var extendUrl = '/v1/register/restaccount';
            SendHttpRequest(data, extendUrl, callback);
        }

        function GetCode(phone, callback){
            var data = {phone:phone};
            var extendUrl = '/v1/code/receive';
            SendHttpRequest(data, extendUrl, callback);
        }

        function IsSessionExpired(id, auth_key, callback){

        }

        function ClearCredentials() {
            $rootScope.globals = {role:'anonymous', account:"null",
                authKey:"null", id:null};

            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function SetCredentials(account, authKey, id, role, expire) {
            //expire count as minute
            $rootScope.globals = {
                role:role,
                account:account,
                authKey:authKey,
                id:id
            };
            var now = new Date();
            var expireDate = new Date(now.getTime() + expire*60*1000);
            $cookies.put('globals', JSON.stringify($rootScope.globals), {'expires': expireDate});
        }

        function GetCredentials(){
            var globals = $cookies.get('globals');
            if(globals != null){
                $rootScope.globals = JSON.parse(globals);
            }else{
                $rootScope.globals = null;
            }

        }

        function SendHttpRequest(data, extendUrl, callback){
            $http({
                method: 'POST',
                url: baseUrl+extendUrl,
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            }).success(function (response) {
                if(response.type == 0){
                    callback({success: false, data: response.result});
                }else{
                    callback({success: true, data:response.result});
                }

            });
        }
    }

 
})();