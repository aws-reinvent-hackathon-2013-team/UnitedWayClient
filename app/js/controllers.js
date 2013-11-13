
(function() {

    'use strict';

    /*
     * Creating the 'uw.controllers' module
     */
    angular.module('uw.controllers', []);

    /*
     * Main Controller
     */
    angular.module('uw.controllers').controller('AppCtrl', ['$scope', '$window', '$http', 'uw.services.api', function($scope, $window, $http, serviceApi) {
        $scope.preferences = {};
        serviceApi.getCategories($scope.donor, function(err, data) {
            $scope.preferences.categoryOptions = data;
        });
        $scope.preferences.distanceOptions = [ 10, 20, 30, 50, 60 ];

        $scope.selectedView = 'welcome-view';

        $scope.location = {
            latitude: 0,
            longitude: 0,
            zip: ""
        };

        $scope.donor = {};
        $scope.donor.registrations = [];
        //TODO: Need to load donor.registrations

        $scope.session = {};

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

            loadOpportunities();
        };

        function loadOpportunities() {

            if(!$scope.location.zip) {

                alertify.error("Please enter Zip code");
            }
            else {

                serviceApi.getOpportunities($scope.donor, { "zip" : $scope.location.zip }, function(err, data) {

                    if(err) {

                        alertify.error("ERROR: Getting Volunteer Opportunities");
                    }
                    else {

                        $scope.opportunities = data;
                    }
                });
            }
        }

        function getLocation() {

            $window.navigator.geolocation.getCurrentPosition(function(position) {

                var latLng = position.coords.latitude + "," + position.coords.longitude;
                serviceApi.getZip({ "latlng" : latLng, "sensor" : "false" }, function(err, zip) {

                    alertify.success("ZIP code: " + zip);
                    $scope.location.zip = zip;
                    $scope.location.latitude = position.coords.latitude;
                    $scope.location.longitude = position.coords.longitude;
                });

            }, function(error) {

                alertify.error("ERROR: Was not able to determine Zip code");
            });
        };

        getLocation();
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

        // Markers
        if($scope.opportunities) {

            var infoWindow = new google.maps.InfoWindow({ content: "..." });

            for(var i = 0; i < $scope.opportunities.length; i++) {

                var data = $scope.opportunities[i];

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.location.latitude, data.location.longitude),
                    map: map,
                    title: data.title,
                    zIndex: i + 1,
                    icon: '/img/blue-dot.png',
                    opportunityId: data.id
                });

                google.maps.event.addListener(marker, 'click', function() {

                    var html = "<a href='/opportunity?id=" + this.opportunityId + "'>" + this.title + "</a>";
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            }
        }
    }]);

    /*
     * Opportunity Controller
     */
    angular.module('uw.controllers').controller('OpportunityCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.oppId = $location.search().id;
        for (var opp in $scope.opportunities) {
            if ($scope.opportunities[opp].id == $scope.oppId) {
                $scope.session.opportunity = $scope.opportunities[opp];
            }
        }

        $scope.register = function() {
            $scope.donor.registrations.push($scope.session.opportunity);
            $location.path("/registered");
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

    /*
     * Login Controller
     */
    angular.module('uw.controllers').controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.login = function() {
            $scope.donor.headerId = $scope.donor.id; // needs to match if we set it!
            $location.path("/index");
        }
    }]);

    /*
     * Registrations Controller
     */
    angular.module('uw.controllers').controller('MyRegistrationsCtrl', ['$scope', '$location', function($scope, $location) {

    }]);
    angular.module('uw.controllers').controller('RegisteredCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.yesFacebook = function() {
            window.location.href = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://unitedway.elasticbeanstalk.com" +
                "&p[images][0]=http://www.unitedwayokc.org/sites/all/themes/uw/images/1.jpg&p[title]=United%20Way&p[summary]=" +
                "I%20Just%20Volunteered%20For%20" + $scope.session.opportunity.title +
                "%20through%20United%20Way.%20Click%20here%20to%20find%20volunteer%20opportunities%20near%20you!";
        }
        $scope.noFacebook = function() {
            $location.path("/main");
        }
    }]);
}());