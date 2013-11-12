
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
    angular.module('uw.controllers').controller('OpportunityCtrl', ['$scope', function($scope) {

    }]);
}());