(function(){

    'use strict';

    /*
     * Creating the MAIN APP 'edusAdmin' module
     */
    angular.module('uw', ['ngRoute', 'uw.services', 'uw.directives', 'uw.filters', 'uw.controllers']);

    angular.module('uw').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.
            when('/welcome', {contorller:'WelcomeCtrl', templateUrl:'app/partials/welcome.html'}).
            when('/opportunities', {controller:'OpportunitiesCtrl', templateUrl:'app/partials/opportunities.html'}).
            when('/opportunitiy', {controller:'OpportunityCtrl', templateUrl:'app/partials/opportunitiy.html'}).
            otherwise({redirectTo:'/welcome'});

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

}());