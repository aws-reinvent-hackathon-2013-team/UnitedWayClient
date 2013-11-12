
(function() {

    'use strict';

    /*
     * Creating the 'uw.controllers' module
     */
    angular.module('uw.controllers', []);

    /*
     * Main Controller
     */
    angular.module('uw.controllers').controller('MainCtrl', ['$scope', '$http', 'uw.services.api.mock', function($scope, $http, serviceApi) {

//        $scope.selectedView = 'welcome-view';
        $scope.selectedView = 'list-view';

        loadOpportunities(91604);

        function loadOpportunities(zip) {
            serviceApi.getOpportunities({}, function(err, data) {
                // TODO: Handle the error
                $scope.opportunities = data;
            });
        }
    }]);

    /*
     * Welcome Controller
     */
    angular.module('uw.controllers').controller('WelcomeCtrl', ['$scope', function($scope) {

    }]);

    /*
     * Opportunities Controller
     */
    angular.module('uw.controllers').controller('OpportunitiesCtrl', ['$scope', function($scope) {

    }]);


    /*
     * Opportunity Controller
     */
    angular.module('uw.controllers').controller('OpportunityCtrl', ['$scope', function($scope) {

    }]);
}());