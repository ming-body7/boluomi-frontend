(function () {
    'use strict';
 
    angular
        .module('myApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {

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
                if(response.type == 2){
                    callback({success: true, data: response.result});
                }else{
                    callback({success: false, data:"error"});
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
            $http.post('http://boluomi.rjl.com/v1/register/resetpassword',
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
            $rootScope.globals = {loggedIn: false, account:"null",
                authKey:"null"};

            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function SetCredentials(account, authKey, id) {

 
            $rootScope.globals = {
                loggedIn:true,
                account:account,
                authKey:authKey,
                id:id
            };

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authKey; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
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