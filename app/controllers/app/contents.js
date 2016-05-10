/**
 * Created by body7 on 16/2/21.
 */
(function(){
    'use strict';
    angular.module('myApp.content', ['ui.router'])
        .config(config)
        .run(run);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.rule(function ($injector, $location) {

            var path = $location.path();
            var hasTrailingSlash = path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }

        });


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('index');
        });

        $stateProvider
            .state('main.content', {
                url: "/content",
                template: "<div ui-view></div>",
                redirectTo: "main.content.content",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }
            })
            .state('main.content.content', {
                url: "",
                templateUrl: "controllers/content/content.view.html",
                controller: "contentController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/manage_brand.css'
                    //css: 'css/main.css'
                }
            })
            .state('main.content.create', {
                url: "/create",
                templateUrl: "controllers/detail/detail.view.html",
                controller: "modifiedController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/new_brand.css'
                    //css: 'css/main.css'
                }

            })
            .state('main.content.modified', {
                url: "/modified/{pid}",
                templateUrl: "controllers/detail/detail.view.html",
                controller: "modifiedController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/new_brand.css'
                    //css: 'css/main.css'
                }

            })
            .state('main.information', {
                url: "/information",
                templateUrl: "controllers/information/information.view.html",
                controller: "informationController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/base_info.css'
                }

            })
            .state('main.password', {
                url: "/updatepassword",
                templateUrl: "controllers/update_password/updatepassword.view.html",
                controller: "updatePasswordController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/change_account.css'
                    //css: 'css/main.css'
                }

            })
            .state('main.account', {
                url: "/account",
                templateUrl: "controllers/reset_account/resetaccount.view.html",
                controller: "resetAccountController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    },
                    //css: 'css/change_account.css'
                    //css: 'css/main.css'
                }

            });
    }

    run.$inject = [];

    function run() {
    }
})();
