
(function() {

    'use strict';

    /*
     * Creating the 'uw.controllers' module
     */
    angular.module('uw.controllers', []);

    /*
     * Main Controller
     */
    angular.module('uw.controllers').controller('AppCtrl', ['$scope', '$http', 'uw.services.api.mock', function($scope, $http, serviceApi) {
        $scope.preferences = {};

        serviceApi.getCategories(function(err, data) {
            $scope.preferences.categoryOptions = data;
        });

        $scope.selectedView = 'welcome-view';

        loadOpportunities(91604);

        function loadOpportunities(zip) {
            serviceApi.getOpportunities({}, function(err, data) {
                // TODO: Handle the error
                $scope.opportunities = data;
            });
        }

        $scope.showMapView = function() {

            $scope.selectedView = 'map-view';
        };

        $scope.showListView = function() {

            $scope.selectedView = 'list-view';
        };

        $scope.getOpportunities = function() {

            if($scope.selectedView === "welcome-view") {

                $scope.selectedView = 'list-view';
            }
        };
    }]);

    /*
     * Welcome Controller
     */
    angular.module('uw.controllers').controller('MainCtrl', ['$scope', function($scope) {

    }]);

    /*
     * Opportunity Controller
     */
    angular.module('uw.controllers').controller('OpportunityCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.oppId = $location.search().id;
        for (var opp in $scope.opportunities) {
            if ($scope.opportunities[opp].id == $scope.oppId) {
                $scope.opportunity = $scope.opportunities[opp];
            }
        }
    }]);

    /*
     * Preferences Controller
     */
    angular.module('uw.controllers').controller('PreferencesCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.save = function() {
            $location.path("/index");
        }
    }]);
}());