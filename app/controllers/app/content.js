/**
 * Created by body7 on 16/2/21.
 */
(function(){
    'use strict';
    angular.module('myApp.content', [])
        .config(config)
        .run(run);

    config.$inject = [];

    function config() {

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


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('index');
        });

        $stateProvider
            .state('main', {
                url: "/main",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@main': {
                        templateUrl: "controllers/content/content.view.html",
                        controller: "contentController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })

            .state('main.create', {
                url: "/create",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@main': {
                        templateUrl: "controllers/create_modified/create_modified.view.html",
                        controller: "modifiedController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('main.modified', {
                url: "/modified/{pid}",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@main': {
                        templateUrl: "controllers/create_modified/create_modified.view.html",
                        controller: "modifiedController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('main.information', {
                url: "/information",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: ""
                    },
                    'content@main': {
                        templateUrl: "controllers/forms/information.view.html",
                        controller: "informationController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('main.password', {
                url: "/updatepassword",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@main': {
                        templateUrl: "controllers/update_password/updatepassword.view.html",
                        controller: "updatePasswordController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('main.account', {
                url: "/account",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: ""
                    },
                    'content@main': {
                        templateUrl: "controllers/reset_account/resetaccount.view.html",
                        controller: "resetAccountController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('preview', {
                url: "/preview/{pid}",
                views: {
                    'main': {
                        templateUrl: "controllers/preview/preview.view.html",
                        controller: "previewController"
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'index'
                    }
                }

            })
            .state('admin', {
                url: "/admin",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@admin': {
                        templateUrl: "controllers/admin/merchants/merchants.view.html",
                        controller: "merchantsController"
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }
            })
            .state('admin_login', {
                url: "/admin/login",
                views: {
                    'main': {
                        templateUrl: "controllers/admin/login/login.view.html",
                        controller: "adminLoginController"
                    }
                },
                data: {
                    permissions: {
                        except: []
                    }
                }
            })
            .state('admin.merchants', {
                url: "/merchants",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@admin': {
                        templateUrl: "controllers/admin/merchants/merchants.view.html",
                        controller: "merchantsController"
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.merchant', {
                url: "/merchant/{merchant_id}",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@admin': {
                        templateUrl: "controllers/admin/merchant/merchant.view.html",
                        controller: "merchantController"
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.products', {
                url: "/products",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@admin': {
                        templateUrl: "controllers/admin/products/products.view.html",
                        controller: "productsController"
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.product', {
                url: "/product/{product_id}",
                views: {
                    'main': {
                        templateUrl: "controllers/main/main.view.html",
                        controller: "mainController"
                    },
                    'content@admin': {
                        templateUrl: "controllers/admin/product/product.view.html",
                        controller: "productController"
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            });
    }

    run.$inject = ['$rootScope', '$cookieStore', 'Permission', 'UserService'];

    function run($rootScope, $cookies, Permission, UserService) {

        $rootScope.globals = $cookies.get('globals') || {};



        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            var x = 1;
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
