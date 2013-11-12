(function() {

    'use strict';

    angular.module('uw.services', []);


    // API Service
    angular.module('uw.services').factory('uw.services.api', ['$http', function($http) {

        var ApiService = {};

        ApiSerivce.getCategories = function(callback) {

            $http(
                {
                    "meghod" : "GET",
                    "url" : "/api/categories",
                    "cache" : false
                })
                .success(function(data, status, headers, config) {

                    callback(false, data);
                })
                .error(function(data, status, headers, config) {

                    callback(true, null);
                });
        };

        /*
         * queryStringParameters:
         * e.g.
         *  { "zip" : "90210", "category" : "cat1", "category" : "cat2" }
         */
        ApiService.getOpportunities = function(queryStringParameters, callback) {

            $http(
                {
                    "meghod" : "GET",
                    "url" : "/api/opportunities",
                    "cache" : false,
                    "params" : queryStringParameters
                })
                .success(function(data, status, headers, config) {

                    callback(false, data);
                })
                .error(function(data, status, headers, config) {

                    callback(true, null);
                });
        };

        return ApiService;
    }]);

    // API Mock Service
    angular.module('uw.services').factory('uw.services.api.mock', ['$http', function($http) {

        var ApiMockService = {};

        ApiMockService.getCategories = function(callback) {

           callback(false, ["Education", "BasicNeeds", "Income"]);
        };

        /*
         * queryStringParameters:
         * e.g.
         *  { "zip" : "90210", "category" : "cat1", "category" : "cat2" }
         */
        ApiMockService.getOpportunities = function(queryStringParameters, callback) {

            /*
             id
             title
             description
             category
             timeStart
             timeEnd
             agency {} - complex object as defined above
             location {}

             */
            callback(false, [
                {
                    "id":"uw1",
                    "title":"Computer Literacy Workshops",
                    "description":"Teach people in under-served communities basic computer literacy in Newport Beach",
                    "agency": {
                        "id": "1234",
                        "name": "Urban Community Outreach Incorporated",
                        "phone": "123-345-4567",
                        "email": "foo@bar.com",
                        "url": "google.com",
                        "location": {
                            "address1": "Foo Street 1",
                            "address2": "",
                            "city": "Bar City",
                            "state": "CA",
                            "zip": "95691"
                        }
                    },
                    "location": {
                        "address1": "Bar Street 2",
                        "address2": "",
                        "city": "Bar City",
                        "state": "CA",
                        "zip": "95691"
                    }
                },
                {
                    "id":"uw1",
                    "title":"Financial Literacy Workshops",
                    "description":"Conduct financial literacy workshops to help educate struggling families in Los Angeles",
                    "agency": {
                        "id": "5678",
                        "name": "America's Fallen Heroes Fund",
                        "phone": "567-435-3456",
                        "email": "bar@foo.com",
                        "url": "yahoo.com",
                        "location": {
                            "address1": "Fooooo Street 234",
                            "address2": "",
                            "city": "Las Vegas",
                            "state": "NV",
                            "zip": "45678"
                        }
                    },
                    "location": {
                        "address1": "Baaaaar Street 5544",
                        "address2": "",
                        "city": "Las Vegas",
                        "state": "NV",
                        "zip": "45678"
                    }
                }
            ]);
        };

        return ApiMockService;
    }]);

}());

