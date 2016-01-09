(function () {
'use strict';

angular
  .module('myApp', ['ngFileUpload','ui.router','ui.bootstrap','ngAnimate','uiSwitch',
        'ngCookies','as.sortable','baiduMap','monospaced.qrcode', 'permission'])
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

    //$urlRouterProvider.otherwise("/index");
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('index');
    });

    $stateProvider
    .state('index', {
        url: "/index",
        views:{
        'main':{
          templateUrl: "controllers/index/index.view.html",
          controller:"indexController"
        }
        },
        data: {
            permissions: {
              except: []
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
          },
          data: {
              permissions: {
                  except: []
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
          },
            data: {
                permissions: {
                    except: []
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
      },
            data: {
                permissions: {
                    except: []
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
      },
            data: {
                permissions: {
                    except: []
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
        },
            data: {
                permissions: {
                    except: []
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
        },
            data: {
                permissions: {
                    except: []
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
      },
            data: {
                permissions: {
                    only: ['user']
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
      },
            data: {
                permissions: {
                    only: ['user']
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
      },
            data: {
                permissions: {
                    only: ['user']
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
          },
            data: {
                permissions: {
                    only: ['user']
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
      },
            data: {
                permissions: {
                    only: ['user']
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
      },
            data: {
                permissions: {
                    only: ['user']
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
      },
            data: {
                permissions: {
                    only: ['user']
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
          views:{
              'main':{
                  templateUrl: "controllers/admin/login/login.view.html",
                  controller:"adminLoginController"
              }
          },
            data: {
                permissions: {
                    except: [],
                    //redirectTo: 'admin_login'
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
          views:{
              'main':{
                  templateUrl: "controllers/main/main.view.html",
                  controller:"mainController"
              },
              'content@admin':{
                  templateUrl: "controllers/admin/products/products.view.html",
                  controller:""
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

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$state', 'DataService','Permission','UserService'];

function run($rootScope, $location, $cookies, $http, $state, DataService, Permission, UserService) {

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
    //TODO: add getAccessLevel function in UserService;
    Permission
        .defineRole('user', function (stateParams) {
            var accessLevel = UserService.getAccessLevel();
            if(accessLevel == 'user'){
                return true;
            }else{
                return false;
            }
        })
        .defineRole('admin', function (stateParams) {
            var accessLevel = UserService.getAccessLevel();
            if(accessLevel == 'admin'){
                return true;
            }else{
                return false;
            }
        });
    }

})();
