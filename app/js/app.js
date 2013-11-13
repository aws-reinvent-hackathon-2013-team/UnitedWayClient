(function(){

    'use strict';

    /*
     * Creating the MAIN APP 'edusAdmin' module
     */
    angular.module('uw', ['ngRoute', 'uw.services', 'uw.directives', 'uw.filters', 'uw.controllers']);

    angular.module('uw').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {controller:'MainCtrl', templateUrl:'/partials/main.html'}).
            when('/opportunity', {controller:'OpportunityCtrl', templateUrl:'/partials/opportunity.html'}).
            when('/registered', {controller:'RegisteredCtrl', templateUrl:'/partials/registered.html'}).
            when('/preferences', {controller:'PreferencesCtrl', templateUrl:'/partials/preferences.html'}).
            when('/login', {controller:'LoginCtrl', templateUrl:'/partials/login.html'}).
            when('/myRegistrations', {controller:'MyRegistrationsCtrl', templateUrl:'/partials/registrations.html'}).
            otherwise({redirectTo:'/index'});

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
}());