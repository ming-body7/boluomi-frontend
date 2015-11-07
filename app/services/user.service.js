(function () {
    'use strict';
 
    angular
        .module('myApp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http', '$rootScope'];
    function UserService($http, $rootScope) {

        var App = $rootScope.App;
        var baseUrl = App.baseUrl;


        var service = {};

        //service.GetAll = GetAll;
        //service.GetById = GetById;
        //service.GetByUsername = GetByUsername;
        service.Create = Create;
        //service.Update = Update;
        //service.Delete = Delete;
 
        return service;

        function Create(user) {
            //return $http.post(baseUrl+'/v1/register/signup', {account:user.account, code:user.code, password:user.password, repassword:user.rePassword})
                //.then(handleSuccess, handleError('Error creating user'));

            return $http({
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
            }).then(handleSuccess, handleError('Error creating user'));
        }
 
        /*function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

 
        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
        */
 
        // private functions
 
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