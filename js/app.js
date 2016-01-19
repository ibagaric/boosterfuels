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
    .directive('watchChange', function () {
        return {
            scope: {
                onchange: '&watchChange'
            },
            link: function (scope, element, attrs) {
                element.on('input', function () {
                    scope.onchange();
                });
            }
        };
    })
// our controller for the form
// =============================================================================
.controller('boosterFormController', function ($scope, $http, $filter, $state) {


    // we will store all of our form data in this object
    $scope.formData = {
        //carmanufacturer: { manufacturer: "" },
        //carmodel: { model: "" }
    };
    $scope.singleManufac = {};
    $scope.singlModel = {};
    //Customer Data Scope
    $scope.customerData = [];
    //Update LocalStorage from UI data
    $scope.updateLocal = function () {

        localStorage.setItem("Name", $scope.formData.name);
        localStorage.setItem("LastName", $scope.formData.lastname);
        localStorage.setItem("Email", $scope.formData.email);
        localStorage.setItem("CardNumber", $scope.formData.creditcardname);
        localStorage.setItem("CCV", $scope.formData.ccv);
        localStorage.setItem("CarManufacturer", $scope.formData.carmanufacturer.manufacturer);
        debugger;
        localStorage.setItem("CarModel", $scope.formData.carmodel.model);
    };

    //Bind Model According to Manufacture
    $scope.change = function () {
        debugger;
        $scope.selectedItem = $scope.formData.carmanufacturer.manufacturer;

        $scope.carmodels = $filter('filter')($scope.modelData.cars, { manufacturer: $scope.selectedItem });
       // $scope.updateLocal();


    };
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
    //get Data into LocalStorage
    $scope.setUpData = function () {
        // localStorage.setItem("Name", "KP Singh");

        if (localStorage.getItem("Name") != 'undefined' && localStorage.getItem("Name") != null) {
            $scope.formData.name = localStorage.getItem("Name");
        }
        if (localStorage.getItem("LastName") != 'undefined' && localStorage.getItem("LastName") != null) {
            $scope.formData.lastname = localStorage.getItem("LastName");
        }
        if (localStorage.getItem("Email") != 'undefined' && localStorage.getItem("Email") != null) {
            $scope.formData.email = localStorage.getItem("Email");
        }
        if (localStorage.getItem("CarManufacturer") != 'undefined' && localStorage.getItem("CarManufacturer") != null) {
            $scope.singleManufac = localStorage.getItem("CarManufacturer");
            debugger;
           // $scope.bindCar();
            //$scope.change();

        }
        if (localStorage.getItem("CarModel") != 'undefined' && localStorage.getItem("CarModel") != null) {
            $scope.singlModel = localStorage.getItem("CarModel");
        }
    }
    //Call Init function
    $scope.setUpData();
   
   

    // function to process the form
    $scope.processForm = function () {
        //Remove current scope value form localstorae
        localStorage.removeItem('Name');
        localStorage.removeItem('LastName');
        localStorage.removeItem('Email');
        localStorage.removeItem('CardNumber');
        localStorage.removeItem('CCV');
        localStorage.removeItem('CarManufacturer');
        localStorage.removeItem('CarModel');
        //Save Current value into localStorage
        //localStorage.setItem("CustmerData","");

        $state.go("form.thankyou");

    };

});