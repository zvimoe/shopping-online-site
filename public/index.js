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
        .when("/register", {
            templateUrl: "register.html"
        })
    

})

store.service("ApiCall", function ($http,$location) {

    this.Login = function (userName, Password, onSuccess, onError) {
        let data = {
            user_name: userName,
            password: Password
        }
        let url = 'http://localhost:8081/login'
        return Post(url, data, onSuccess, onError)
    }
    this.findUser = function (id, onSuccess, onError) {
        let url = 'http://localhost:8081/find-user/' + id

        Get(url, onSuccess, onError)

    }
    this.register= function(data,onSuccess, onError){
        console.log(data)
       let url = 'http://localhost:8081/user'
        Post(url,data,onSuccess, onError)
    }
    function Post(url, data, onSuccess, onError) {
        $http({
            method: 'POST',
            url: url,
            type: 'application/x-www-form-urlencoded',
            data: data
        }).then(onSuccess, onError)
    }
    function Get(url, onSuccess, onError) {
        $http({
            method: 'GET',
            url: url,
            type: 'application/x-www-form-urlencoded',
        }).then(onSuccess, onError)
    }
})
store.controller('mainpagecontroller', function login($scope, ApiCall, $rootScope,$location) {
    $scope.userName = ""
    $scope.password = ""
    $scope.message = ""
    this.onSuccess = function (res) {
        console.log(res)
        $rootScope.personName = 'Hello ' + res.data.first_name + '!';
        //popup with res data 
        //if res is null 
    }
    function onError(response) {
        console.log('error');
        console.log(response);

    }

    $scope.submitlogin = () => {
        ApiCall.Login($scope.userName, $scope.password, this.onSuccess, this.onError)
    }

})
store.controller('register', function($scope, ApiCall,$location) {
    var data1 = {
        id: {
            type: "number",
            class: "login",
            placeHolder: "ID",
            val: ""
        },
        email: {
            type: "email",
            class: "login",
            placeHolder: "Email",
            val: ""
        },
        password1: {
            type: "password",
            class: "login",
            placeHolder: "Password",
            val: ""
        },
        password2: {
            type: "password",
            class: "login",
            placeHolder: "Confirm Password",
            val: ""
        },

    }
    var data2 = {

        city: {
            type: "text",
            class: "login",
            placeHolder: "City",
            val: ""
        },
        street: {
            type: "text",
            class: "login",
            placeHolder: "Street",
            val: ""
        },
        first_name: {
            type: "text",
            class: "login",
            placeHolder: "Name",
            val: ""
        },
        last_name: {
            type: "text",
            class: "login",
            placeHolder: "Last Name",
            val: ""
        }
    }
    $scope.data=data1
    $scope.formNumber = 1

    function showForm2() {
        data1 = $scope.data
        $scope.data = data2;
        $scope.formNumber = 2
        console.log($scope.data)
    }
    function valadate1(data) {
        return new Promise(
            function (resolve, reject) {
                var message = []
                if (typeof (data.id.val) != 'number') {
                    console.log(typeof (data.id.val))
                    message.push('ID must be a number')
                }
                if (data.id.val == "") message.push('the ID field is reqiured')
                if (!data.email.val) message.push('Email is incorrect')
                if (data.email.val == "") message.push('the email field is reqiured')
                ApiCall.findUser(data.id.val, os, oe)
                function os(res) {
                    console.log(res)
                    if (res.data == 'found') {
                        message.push('User ID already exists')
                        // for some reson does not work on second submit todo 
                    }
                }
                function oe(err) {
                    if (err.status = '404') return
                    else console.log(err)
                }


                if (data.password1.val != data.password2.val) {
                    message.push("passwords don't match")
                }

                resolve(message)

            }
        )
    }
    $scope.submit = () => {
        $scope.message = ""
        if ($scope.formNumber == 1) {
            valadate1($scope.data).then((res) => {
                if (res.length > 0) {
                    $scope.message = res
                }
                else {
                    showForm2()
                }
            })
        }
        if ($scope.formNumber == 2) {
            ApiCall.register(
                {
                    user_name: data2.first_name.val,
                    password: data1.password1.val,
                    first_name: data2.first_name.val,
                    last_name: data2.last_name.val,
                    street: data2.street.val,
                    city: data2.city.val,
                    id: data1.id.val,
                    email: data1.email.val

                },
                this.onSuccess,
                this.onError
            )
        }
    }
    this.onSuccess = function (res) {
        $location.path('/')
    }
    this.onError = function (err) {
        console.log(err.data.details[0].message)
        $scope.message = [err.data.details[0].message]
    }
})
store.controller('placeOrder', function ($scope, serviceComp, orderservice) {
    $scope.user = {
        firstname: {
            type: "text",
            class: "login",
            placeHolder: "",
            val: ""
        },
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