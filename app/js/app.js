(function(){

    'use strict';

    /*
     * Creating the MAIN APP 'edusAdmin' module
     */
    angular.module('uw', ['ngRoute', 'AngularGM', 'uw.services', 'uw.directives', 'uw.filters', 'uw.controllers']);

    angular.module('uw').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {controller:'MainCtrl', templateUrl:'app/partials/main.html'}).
            when('/opportunity', {controller:'OpportunityCtrl', templateUrl:'app/partials/opportunity.html'}).
            when('/preferences', {controller:'PreferencesCtrl', templateUrl:'app/partials/preferences.html'}).
            otherwise({redirectTo:'/index'});

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
}());