require.config({
    paths : {
        'jquery':'js/jquery',
        'baiduMapApi':'http://api.map.baidu.com/api?v=1.5&ak=5U8M51SeGixHSOHsMzKLt1NG',
        'angular' : 'bower_components/angular/angular',
        'angularUiRouter' : 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angularBootstrap':'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'angularAnimate' : 'bower_components/angular-animate/angular-animate',
        'angularCookies' :'bower_components/angular-cookies/angular-cookies',
        'angularFileUpload':'bower_components/ng-file-upload/ng-file-upload-all',
        'angularBaiduMap':'bower_components/BaiduMapForAngularJS/baiduMap',
        'angularSortable':'bower_components/ng-sortable/dist/ng-sortable.min',
    },
    shim : {
        'jquery': {
            exports:'jquery'
        },
        'baiduMapApi' : {
            exports : 'baiduMapApi'
        },
        'angular' : {
            exports : 'angular'
        },
        'angularUiRouter' : {
            deps : ['angular']
        },
        'angularBootstrap' : {
            deps : ['angular']
        },
        'angularAnimate' : {
            deps : ['angular']
        },
        'angularCookies' : {
            deps : ['angular']
        },
        'angularFileUpload' : {
            deps : ['angular']
        },
        'angularBaiduMap' : {
            deps : ['angular']
        },
        'angularSortable' : {
            deps : ['angular']
        }


    }
});
