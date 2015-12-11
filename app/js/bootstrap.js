/**
 * Created by body7 on 15/12/11.
 */
define(['require',
    'angular',
    'angular-route',
    'jquery',
    'app',
    'router'
],function(require,angular){
    'use strict';
    require(['domReady!'],function(document){
        angular.bootstrap(document,['webapp']);
    });
});