/**
 * Created by body7 on 16/2/21.
 */
(function(){
    'use strict';
    angular.module('myApp.admin', ['ui.router'])
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
            .state('admin.merchants', {
                url: "/merchants",
                template:"<ui-view></ui-view>",
                redirectTo: "admin.merchants.list",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.merchants.list', {
                url: "",
                templateUrl: "controllers/admin/merchants/merchants.view.html",
                controller: "merchantsController",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.merchants.merchant', {
                url: "/merchant/{merchant_id}",
                templateUrl: "controllers/admin/merchant/merchant.view.html",
                controller: "merchantController",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.products', {
                url: "/products",
                template:"<ui-view></ui-view>",
                redirectTo: "admin.products.list",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.products.list', {
                url: "",
                templateUrl: "controllers/admin/products/products.view.html",
                controller: "productsController",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            })
            .state('admin.products.product', {
                url: "/product/{product_id}",
                templateUrl: "controllers/admin/product/product.view.html",
                controller: "productController",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'admin_login'
                    }
                }

            });
    }

    run.$inject = [];

    function run() {
    }
})();
