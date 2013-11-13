
(function() {

    'use strict';

    /*
     * Creating the 'uw.controllers' module
     */
    angular.module('uw.controllers', []);

    /*
     * Main Controller
     */
    angular.module('uw.controllers').controller('AppCtrl', ['$scope', '$window', '$http', 'uw.services.api.mock', function($scope, $window, $http, serviceApi) {
        $scope.preferences = {};

        serviceApi.getCategories(function(err, data) {
            $scope.preferences.categoryOptions = data;
        });

        $scope.selectedView = 'welcome-view';
        $scope.zip;
        $scope.location = {
            latitude: 0,
            longitude: 0
        };

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

        function loadOpportunities(zip) {
            serviceApi.getOpportunities({}, function(err, data) {
                // TODO: Handle the error
                $scope.opportunities = data;
            });
        }

        function getLocation() {

            $window.navigator.geolocation.getCurrentPosition(function(position) {

                var latLng = position.coords.latitude + "," + position.coords.longitude;
                serviceApi.getZip({ "latlng" : latLng, "sensor" : "false" }, function(err, zip) {

                    $scope.zip = zip;
                    $scope.location.latitude = position.coords.latitude;
                    $scope.location.longitude = position.coords.longitude;
                });

            }, function(error) {
                // TODO
                console.log("ERROR: getLocation");
            });
        };

        getLocation();

        loadOpportunities(91604);

    }]);

    /*
     * Welcome Controller
     */
    angular.module('uw.controllers').controller('MainCtrl', ['$scope', '$window', function($scope, $window) {

    }]);

    /*
     * Map Controller
     */
    angular.module('uw.controllers').controller('MapCtrl', ['$scope', '$window', function($scope, $window) {

        var myLatLng = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);

        var mapOptions = {
            zoom: 14,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map($window.document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'My Location'
        });

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