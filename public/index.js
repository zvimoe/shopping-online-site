'use strict'
var store = angular.module("online-store", ["ngRoute"]);
store.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            // resolve: {
            //     "check": function ($location, loginchecker) {
            //         if (1+1==3) {
            //             $location.path('/')
            //         }
            //     }
            // },
            templateUrl: "mainpage.html"
        })
        // .when("/order", {
        //     templateUrl: "order.html"
        // })
        // .when("/showcart", {
        //     templateUrl: "showcart.html"
        // })
        // .when("/contact", {
        //     templateUrl: "contact.html"
        // })
        // .when("/books", {
        //     templateUrl: "books.html"
        // })

})
store.service('serviceComp', function () {
    this.cart = []
    this.add = function (x) {
        this.cart.push(x);
        console.log(this.cart)
    }
    this.getItemsCart = function () {
        return JSON.stringify(this.cart)
    }
})
store.service('orderservice', function () {
    this.placeorder = function (user, books) {
        console.log(user);
        console.log(books)
    }


})
store.filter('nameToUpper', function () {

    function stringToUpper(string) {
        let a = string.toUpperCase()
        return a;
    }


    return function (input) {
        for (let i = 0; i < input.length; i++) {
            input[i].name = stringToUpper(input[i].name)
        }
        return input

    }
})
store.filter('bestseller', function () {




    return function (input, isbn) {

        for (let i = 0; i < input.length; i++) {
            if (input[i].isbn == isbn) {
                input[i].note = 'best seller'
            }
        }
        return input

    }
})
store.filter('changeImgSize', function () {




    return function (input, isbn) {

        for (let i = 0; i < input.length; i++) {
            if (input[i].isbn == isbn) {
                input[i].img.width = '176';
                input[i].img.height = '176';
            }
        }
        return input

    }
})




store.controller('book1', function ($scope, serviceComp) {
    $scope.bookarray = [
        new book('igrot moshe', 'igrot-moshe.gif', 123),
        new book('mishne brura', 'misnabrura.jpg', 345),
        new book('tanach', 'tanach.jpg', 678)

    ]

    function book(name, img, isbn) {
        this.name = name;
        this.img = {
            img: img,
        }
        this.isbn = isbn,
            this.note;

    }
    $scope.add = function (isbn) {
        serviceComp.add(isbn)

    }
});
store.controller('showCart', function showCartCtrl($scope, serviceComp) {
    $scope.showCart = function () {
        $scope.isbns = serviceComp.getItemsCart();
    }
})
store.controller('placeOrder', function ($scope, serviceComp, orderservice) {
    $scope.user = {
        firstname: "",
        lastname: ""
    }
    $scope.order = function () {
        orderservice.placeorder($scope.user, serviceComp.getItemsCart())
    }
})
store.controller('contact', function ($scope) {
    $scope.contact = {
        tel: "0533153255",
        address: "havkook 39/16 beit shemesh israel 9913900",
        email: "zsondhelm@gmial.com"

    }




})