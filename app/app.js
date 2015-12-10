(function () {
'use strict';

angular
  .module('myApp', ['ngFileUpload','ui.router','ui.bootstrap','ngAnimate','uiSwitch','ngCookies','as.sortable','baiduMap'])
  .config(config)
  .run(run);


config.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider"];

function config($stateProvider, $urlRouterProvider, $httpProvider){

    var App;
    App = angular.copy(Config);
    window.App = App;



    $httpProvider.defaults.withCredentials = true;



    $urlRouterProvider.rule(function($injector, $location) {

        var path = $location.path();
        var hasTrailingSlash = path[path.length-1] === '/';

        if(hasTrailingSlash) {
            //if last charcter is a slash, return the same url without the slash
            var newPath = path.substr(0, path.length - 1);
            return newPath;
        }

    });

    $urlRouterProvider.otherwise("/index");

  $stateProvider
    .state('index', {
      url: "/index",
      views:{
        'main':{
          templateUrl: "controllers/index/index.view.html",
          controller:"indexController"
        }
      }
      
    })
      .state('brand', {
          url: "/brand",
          views:{
              'main':{
                  templateUrl: "controllers/brand/brand.view.html",
                  controller:"brandController"
              }
          }

      })
      .state('audit', {
          url: "/audit",
          views:{
              'main':{
                  templateUrl: "controllers/audit/audit.view.html",
                  controller:"auditController"
              }
          }

      })

    .state('login', {
      url: "/login",
      views:{
        'main':{
          templateUrl: "controllers/login/login.view.html",
          controller:"loginController"
        }
      }
      
    })
    .state('register', {
      url: "/register",
      views:{
        'main':{
          templateUrl: "controllers/register/register.view.html",
          controller:"registerController",
        }
      }
      
    })
      .state('resetPassword', {
        url: "/resetpassword",
        views:{
          'main':{
            templateUrl: "controllers/password/resetpassword.view.html",
            controller:"resetPasswordController"
          }
        }

      })
      .state('resetAccount', {
        url: "/resetaccount",
        views:{
          'main':{
            templateUrl: "controllers/password/resetaccount.view.html",
            controller:"resetAccountController"
          }
        }
      })

    .state('main', {
      url: "/main",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:"mainController"
        },
        'content@main':{
          templateUrl: "controllers/content/content.view.html",
          controller:"contentController"
        }
      }
      
    })

    .state('main.create', {
      url: "/create",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:"mainController"
        },
        'content@main':{
          templateUrl: "controllers/create_modified/create_modified.view.html",
          controller:"modifiedController"
        }
      }
      
    })
    .state('main.modified', {
      url: "/modified/{pid}",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:"mainController"
        },
        'content@main':{
          templateUrl: "controllers/create_modified/create_modified.view.html",
          controller:"modifiedController"
        }
      }
      
    })
      .state('main.advertisement', {
          url: "/ad",
          views:{
              'main':{
                  templateUrl: "controllers/main/main.view.html",
                  controller:""
              },
              'content@main':{
                  templateUrl: "controllers/advertisement/advertisement.view.html",
                  controller:"advertisementController"
              }
          }

      })
    .state('main.information', {
      url: "/information",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:""
        },
        'content@main':{
          templateUrl: "controllers/forms/information.view.html",
          controller:"informationController"
        }
      }
      
    })
    .state('main.password', {
      url: "/updatepassword",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:"mainController"
        },
        'content@main':{
          templateUrl: "controllers/password/updatepassword.view.html",
          controller:"updatePasswordController"
        }
      }
      
    })
    .state('main.account', {
      url: "/account",
      views:{
        'main':{
          templateUrl: "controllers/main/main.view.html",
          controller:""
        },
        'content@main':{
            templateUrl: "controllers/password/resetaccount.view.html",
            controller:"resetAccountController"
        }
      }
      
    })
      .state('admin', {
          url: "/admin",
          views:{
              'main':{
                  templateUrl: "controllers/main/main.view.html",
                  controller:"mainController"
              },
              'content@admin':{
                  templateUrl: "controllers/admin/merchants/merchants.view.html",
                  controller:"merchantsController"
              }
          }
      })
      .state('admin_login', {
          url: "/admin/login",
          views:{
              'main':{
                  templateUrl: "controllers/admin/login/login.view.html",
                  controller:"adminLoginController"
              }
          }
      })
      .state('admin.merchants', {
          url: "/merchants",
          views:{
              'main':{
                  templateUrl: "controllers/main/main.view.html",
                  controller:"mainController"
              },
              'content@admin':{
                  templateUrl: "controllers/admin/merchants/merchants.view.html",
                  controller:""
              }
          }

      })
      .state('admin.products', {
          url: "/products",
          views:{
              'main':{
                  templateUrl: "controllers/main/main.view.html",
                  controller:"mainController"
              },
              'content@admin':{
                  templateUrl: "controllers/admin/products/products.view.html",
                  controller:""
              }
          }

      });
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$state', 'DataService'];

function run($rootScope, $location, $cookies, $http, $state, DataService) {

        // keep user logged in after page refresh




        $rootScope.admin = false;

        $rootScope.globals = $cookies.get('globals') || {};
        //$rootScope.globals.loggedIn = true;
        /*
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            // redirect to login page if not logged in and trying to access a restricted page
            var admin = $rootScope.admin;
            if(!admin){
                if(toState.name === 'admin'){
                    event.preventDefault();
                    $state.go('admin_login');
                }else{
                    var restrictedState = (["index","login", "register","resetpassword"].indexOf(toState.name) === -1);
                    var loggedIn = $rootScope.globals.loggedIn;
                    if (restrictedState && !loggedIn) {
                        $state.go('index');
                    }
                }
            }else{
                var restrictedState = (["admin", "admin.merchants","admin.products"].indexOf(toState.name) === -1);

                if (restrictedState) {
                    $state.go('admin');
                }
            }

            if(fromState.name == 'create' || fromState.name == 'modified'){
                //confirmation dialog
            }

        });
        */
    }

})();
