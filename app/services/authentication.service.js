(function () {
    'use strict';
 
    angular
        .module('myApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {

        var App = $rootScope.App;
        var baseUrl = App.baseUrl;

        var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ResetPassword = ResetPassword;
        service.UpdatePassword = UpdatePassword;
        service.ResetAccount = ResetAccount;
        service.GetCredentials = GetCredentials;


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



            $http({
                method: 'POST',
                url: baseUrl+'/v1/register/logout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {}
            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });

        }




        function ResetPassword(account, code, password, rePassword, callback){
            $http.post(baseUrl+'/v1/register/resetpassword',
                {account: account, code:code, password: password, repassword:rePassword})
                .success(function (response) {
                    if(response.type == 2){
                        callback({success: true, data: response.result});
                    }else{
                        callback({success: false, data:response.result});
                    }

                });

        }

        function UpdatePassword(auth_key, oldpassword, newpassword, renewpassword, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/register/updatepassword',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {auth_key:auth_key, oldpassword:oldpassword, newpassword:newpassword, renewpassword:renewpassword}

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        function ResetAccount(auth_key, password, newaccount, code, callback){

            $http({
                method: 'POST',
                url: baseUrl+'/v1/register/restaccount',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:  {auth_key:auth_key, password:password, newaccount:newaccount, code:code}

            }).success(function (response) {
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
                }

            });
        }

        function ClearCredentials() {
            $rootScope.globals = {role:'anonymous', account:"null",
                authKey:"null", id:null};

            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function SetCredentials(account, authKey, id, role) {

 
            $rootScope.globals = {
                role:role,
                account:account,
                authKey:authKey,
                id:id
            };

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authKey; // jshint ignore:line
            $cookies.put('globals', JSON.stringify($rootScope.globals));
        }


        function GetCredentials(){
            var globals = $cookies.get('globals');
            if(globals != null){
                $rootScope.globals = JSON.parse(globals);
            }else{
                $rootScope.globals = null;
            }

        }


        function handleSuccess(data) {
            if(data.data.type == 2){

                return { success: true ,message: data.data.result};

            }else{

                return { success: false, message: data.data.msg};

            }

        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

    }

 
})();