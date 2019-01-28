'use strict'
var storeApp = angular.module("online-store", ["ngRoute",'ui.bootstrap']);

storeApp.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "mainpage.html",
            controller:'mainpagecontroller',
           

        })
        .when("/register", {
            templateUrl: "register.html"
        })
        .when('/store', { 
            templateUrl: 'store.html'
        })
        .when('/dashbored',{  
            templateUrl:'/dashbored.html' 
        })

        
})
storeApp.service("ApiCall", function ($http, $location) {
    this.load = function () {

        return Get('getsession')

    }
    this.Login = function (userName, Password) {
        let data = {
            user_name: userName,
            password: Password
        }
        let url = 'login'
        return Post('login', data)
    }
    this.Logout = function () {
        return Get('logout')
    }
    this.findUser = function (id) {
        let url = 'find-user/' + id
        return Get(url)
    }
    this.register = function (data) {
        console.log(data)
        let url = 'user'
        return Post(url, data)
    }
    this.saveInitialdata =function(data){
        localStorage.setItem('Idta',JSON.stringify(data))
    }
    this.getInitialdata = function(data){    
        return JSON.parse(localStorage.getItem('Idta'))
    }
    this.getShopData=function(){
       return Get('start_shopping')
    }
    this.getCitems = function(id){
        return Get('category/items/'+id)
    }
    function Post(url, data) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/' + url,
            type: 'application/x-www-form-urlencoded',
            data: data
        })
    }
    function Get(url) {
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/' + url,
            type: 'application/x-www-form-urlencoded',
        })
    }
})
storeApp.controller('mainpagecontroller', function ($scope, ApiCall, $rootScope, $location, $route) {
    $rootScope.rightTmp;
    $scope.userName;
    $scope.password;
    $scope.message;
    ApiCall.load().then((user) => {
        console.log(user.data.session)
        $scope.ItemCount = user.data.itemsCount
        $scope.OrderCount = user.data.orderCount
        if (user.data.session && user.data.session.length != 0) {
            ApiCall.saveInitialdata(user.data.session)
            loadUser(user.data.session)
        }
        else {
            $scope.rightTmp = "login.html"
        }

    })
    function loadUser(user) {
        if (user.role == 1) {
            $rootScope.personName = 'Hello hell!';
            $location.path("/dashbored");


        }
        else {
            $rootScope.personName = 'Hello ' + user.first_name + '!';
            $scope.rightTmp = "startShopping.html";
            $scope.notice = {}
            if (user.carts_active) {
                $scope.notice.carts = 'you have an active cart'
                $scope.shopBtn = 'Continue'
            }
            else {
                $scope.shopBtn = 'Start'
            }
            if (user.orders_active) {
                $scope.notice.orders = 'you have an active order'
            }
            if (user.new == 1) {
                $scope.notice.new = 'wecome new user'
            }
        }

    }
    $scope.Logout = () => {
        $rootScope.personName = ""
        ApiCall.Logout().then(
            $route.reload
        )

    }
    $scope.submitlogin = () => {
        console.log($scope)
        ApiCall.Login($scope.userName, $scope.password).then((res) => {
            console.log(res)
            loadUser(res.data)
            $route.reload()
        }).catch((err) => {
            console.log(err);
            $scope.message = err.data

        })
    }

})
storeApp.controller('register', function ($scope, ApiCall, $location) {
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
    $scope.data = data1
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
                ApiCall.findUser(data.id.val).then(function (res) {
                    console.log(res)
                    if (res.data == 'found') {
                        message.push('User ID already exists')
                    }
                }).catch(function (err) {
                    if (err.status = '404') return
                    else console.log(err)
                })




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

                }

            ).then((res) => {
                $location.path('/')
            }).catch(
                function (err) {
                    console.log(err.data.details[0].message)
                    $scope.message = [err.data.details[0].message]
                })
        }
    }

})
storeApp.controller('placeOrder', function ($scope, serviceComp, orderservice) {
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
storeApp.controller('contact', function ($scope) {
    $scope.contact = {
        tel: "0533153255",
        address: "havkook 39/16 beit shemesh israel 9913900",
        email: "zsondhelm@gmial.com"

    }




})
storeApp.controller('store', function ($scope,ApiCall,$uibModal,$rootScope,) {
    ApiCall.getShopData().then((res)=>{
        $scope.data = res.data
        console.log(res)
    })
    $scope.loadCitems = (id)=>{
        ApiCall.getCitems(id).then((res)=>{
            console.log(res)
            $scope.data.items = res.data
        })
    }
    $scope.open = function(obj){
        console.log(obj)
        var modalInstance =  $uibModal.open({
          templateUrl: "item-model.html",
          controller:'itemModel',
          resolve:{
          item:function(){
              return obj
          }
        },
          size: '',
        });
    
    modalInstance.result.then(function (selectedItem) {
        $ctrl.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());e
      });
    }
})
storeApp.controller('itemModel',function ($uibModalInstance,$scope, item)  {
  $scope.data = item
  $scope.amount = 0
  $scope.finaleprice = 0
  

    
})

