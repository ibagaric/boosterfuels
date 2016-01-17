// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])


// configuring our routes 
// =============================================================================
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'boosterFormController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/contact)
        .state('form.contact', {
            url: '/contact',
            templateUrl: 'form-contact.html'
        })

        // url will be /form/car
        .state('form.car', {
            url: '/car',
            templateUrl: 'form-car.html'
        })

        // url will be /form/thankyou
        .state('form.thankyou', {
            url: '/thankyou',
            templateUrl: 'thankyou.html'
        })
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/contact');

})
    .filter('unique', function () {
        return function (input, key) {
            var unique = {};
            var uniqueList = [];
            for (var i = 0; i < input.length; i++) {
                if (typeof unique[input[i][key]] == "undefined") {
                    unique[input[i][key]] = "";
                    uniqueList.push(input[i]);
                }
            }
            return uniqueList;
        };
    })
// our controller for the form
// =============================================================================
.controller('boosterFormController', function ($scope, $http, $filter, $state) {

    // we will store all of our form data in this object
    $scope.customerData = [];
    $scope.formData = {};
    //Bind Car data from Json
    $scope.bindCar = function () {
        $scope.cardddata = [
            { manufacturer: "VW", model: "Passat" },
            { manufacturer: "Nissan", model: "GT-R" },
            { manufacturer: "Honda", model: "Civic" },
        ];
        $scope.modelData = $scope.cardddata
        $http.get('data/cars.json').success(function (array) {
           
            $scope.carData = array;

            $scope.modelData = array;
        });

    };
    //On Change of Manu.
    $scope.change = function () {

        $scope.selectedItem = $scope.formData.carmanufacturer.manufacturer;
    
        $scope.carmodels = $filter('filter')($scope.modelData.cars, { manufacturer: $scope.formData.carmanufacturer.manufacturer });

    };
    // function to process the form
    $scope.processForm = function () {
        // alert("awesome")

        $state.go("form.thankyou");
        // $post('data/customerData.json', $scope.contact);
        //$http({
        //    method: 'POST',
        //    url: 'data/customerData.json',
        //    headers: {
        //        'type': 'application/json;charset=utf-8;', /*or whatever type is relevant */
        //        'Accept': 'application/json' /* ditto */
        //    },
        //    data: {"CustomerData":$scope.contact}
        //});
        //$http.post('data/customerData.json', { contact: contact }).success(function (data) {
        //    debugger;
        //    console.log(data)
        //    alert($scope.msg);

        //});

        //$http.post('data/customerData.json', JSON.stringify($scope.formData)).success(function (data) {
        //    debugger;
        //    $scope.msg = 'Data saved';
        //});
        //alert($scope.msg);
    };

});