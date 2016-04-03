(function () {
    'use strict';

    angular
        .module('myApp', ['myApp.directive','myApp.content', 'myApp.admin','ngMessages','ngFileUpload',
            'ui.router', 'ui.bootstrap', 'ngAnimate', 'uiSwitch','baiduMap','uiRouterStyles','progressButton',
            'ngCookies', 'as.sortable', 'baiduMap', 'monospaced.qrcode', 'permission','angularLoad'])
        .config(config)
        .run(run);


    config.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider"];

    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        var App;
        App = angular.copy(Config);
        window.App = App;


        $httpProvider.defaults.withCredentials = true;


        $urlRouterProvider.rule(function ($injector, $location) {

            var path = $location.path();
            var hasTrailingSlash = path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }

        });

        //$urlRouterProvider.otherwise("/index");
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('index');
        });

        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "controllers/index/index.view.html",
                controller: "indexController",
                data: {
                    permissions: {
                        except: []
                    },
                    css: 'css/main.css'
                }
            })
            .state('brand', {
                url: "/brand",
                templateUrl: "controllers/brand/brand.view.html",
                controller: "brandController",
                data: {
                    permissions: {
                        except: []
                    },
                    css: 'css/finishbrandinfo.css'
                }
            })
            .state('audit', {
                url: "/audit",
                templateUrl: "controllers/audit/audit.view.html",
                controller: "auditController",
                data: {
                    permissions: {
                        except: []
                    }
                }
            })
            .state('login', {
                url: "/login",
                templateUrl: "controllers/login/login.view.html",
                controller: "loginController",
                data: {
                    permissions: {
                        except: []
                    }
                }
            })
            .state('register', {
                url: "/register",
                templateUrl: "controllers/register/register.view.html",
                controller: "registerController",
                data: {
                    permissions: {
                        except: []
                    },
                    css: 'css/finishbrandinfo.css'
                }
            })
            .state('main', {
                url: "/main",
                abstract: true,
                templateUrl: "controllers/main/main.view.html",
                controller: "mainController",
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }
            })
            .state('preview', {
                url: "/preview/{pid}",
                templateUrl: "controllers/preview/preview.view.html",
                controller: "previewController",
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'index'
                    }
                }
            })
            .state('admin', {
                url: "/admin",
                abstract: true,
                templateUrl: "controllers/admin/main/adminMain.view.html",
                //controller: "adminMainController",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }
            })
            .state('admin_login', {
                url: "/admin/login",
                templateUrl: "controllers/admin/login/login.view.html",
                controller: "adminLoginController",
                data: {
                    permissions: {
                        except: []
                    }
                }
            });
    }

    run.$inject = ['$rootScope', '$cookieStore', 'Permission', 'UserService', '$state'];

    function run($rootScope, $cookies, Permission, UserService, $state) {

        $rootScope.globals = $cookies.get('globals') || {};



        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)

            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            var currentState = {
                toStateName: toState.name,
                toParams: toParams,
                time: new Date()
            };
            if(currentState.toStateName != 'index'){
                $cookies.put('currentState', JSON.stringify(currentState));
            }

        });

        Permission
            .defineRole('user', function (stateParams) {
                var accessLevel = UserService.getAccessLevel();
                if (accessLevel == 'anonymous') {
                    return true;
                } else {
                    return false;
                }
            })
            .defineRole('user', function (stateParams) {
                var accessLevel = UserService.getAccessLevel();
                if (accessLevel == 'user') {
                    return true;
                } else {
                    return false;
                }
            })
            .defineRole('admin', function (stateParams) {
                var accessLevel = UserService.getAccessLevel();
                if (accessLevel == 'admin') {
                    return true;
                } else {
                    return false;
                }
            });
    }

})();
