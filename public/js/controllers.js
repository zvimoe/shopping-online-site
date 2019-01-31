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
            console.log(user)
            loadUser(user.data.session)
        }
        else {
            $scope.rightTmp = "templates/login.html"
        }

    })
    function loadUser(user) {
        if (user.role == 1) {
            $rootScope.personName = 'Hello ' + user.first_name + '!';
            $scope.rightTmp = "templates/startShopping.html";
            $scope.shopBtn = "Go to Dashbored"
            $scope.notice = {}
            $scope.notice.new = "Admin Has The rights to add Items"


        }
        else {
            $rootScope.personName = 'Hello ' + user.first_name + '!';
            $scope.rightTmp = "templates/startShopping.html";
            $scope.notice = {}
            if (user.carts_active == 1) {
                $scope.notice.carts = 'Welcome Back you have an active cart'
                $scope.shopBtn = 'Continue Shoppnig'
            }
            else {
                $scope.shopBtn = 'Start Shoppnig'
            }
            if (user.orders_active) {
                $scope.notice.orders = 'you have an active order '
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
                        console.log('res')
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
storeApp.controller('store', function ($scope, ApiCall, $uibModal, $route, load, $location, $rootScope) {
    if (load.data.session && load.data.session.length != 0) {
        console.log(load.data.session);
        $rootScope.personName = 'Hello ' + load.data.session.first_name;
        if (load.data.session.role == 1) {
            var admin = true
        }
        else{
            var admin =null
        }
        function updateCart(obj){
             let id = obj.item_id;
            $scope.data.cart_items.map((item) => {
                console.log(item.item_id + ':' + id)
                if (item.item_id == id) {
                    item = obj
                    console.log(obj)
                }
            })
            $scope.data.cart_total+=obj.price

        }
        $scope.plusCartItem = function(obj){
            var params  =  obj;
            params.amount++
            params.total +=params.price
            console.log(params)
            ApiCall.updateCartItem(params).then(
                ()=>{
                    updateCart(params)
                }
            )
        }
        $scope.minusCartItem = function(obj){
            var params  =  obj;
            params.amount--
            params.total -=params.price
            ApiCall.updateCartItem(params).then(
                ()=>{
                    updateCart(params)
                }
            )
        }
        $scope.deleteCartItem = function(id){
            ApiCall.deleteCartItem(id).then(()=>{
                $route.reload()
            })
        }
        ApiCall.getShopData().then((res) => {
            $scope.data = res.data
            $scope.data.cart_total = 0
            console.log(res)
        }).then(() => {
            $scope.data.cart_items.map((item) => {
                $scope.data.cart_total = $scope.data.cart_total + item.total
            })
            if (admin) $scope.data.storeRightBar = 'templates/itemForm.html'
            else $scope.data.storeRightBar = 'templates/cart.html'

            $scope.data.storeMain = 'templates/items.html'
        }
        )

        $scope.loadCitems = (id) => {
            ApiCall.getCitems(id).then((res) => {
                console.log(res)
                $scope.data.items = res.data
            })
        }

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;

        if (admin) {
            $scope.open = function (obj) {
                $scope.fillAdminForm = obj
            }
        }
        else {
            $scope.open = function (obj) {
                console.log(obj)
                var modalInstance = $uibModal.open({
                    templateUrl: "templates/item-model.html",
                    controller: 'itemModel',
                    resolve: {
                        item: function () {
                            return obj
                        }
                    },
                    size: '',
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.data.cart_total += selectedItem.total
                    var id = selectedItem.item_id
                    $scope.data.cart_items.map((item) => {
                        console.log(item.item_id + ':' + id)
                        if (item.item_id == id) {
                            selectedItem.amount = item.amount + selectedItem.amount
                            console.log('yeh')
                        }

                    })
                    ApiCall.postCartItem(selectedItem).then(
                        (res) => {
                            console.log(res.data)
                            $scope.data.cart_items = res.data

                      }
                    )
                });
                modalInstance.dismiss('err');
            }

            $scope.Placeorder = function () {
                ApiCall.Order({
                    cart_id: $scope.data.user.cart_id,
                    user_id: $scope.data.user.id,
                    final_price: $scope.data.cart_total,
                    shipping_city: $scope.data.city,
                    shipping_street: $scope.data.street,
                    shipping_date: $scope.data.date,
                    card: $scope.data.cardNumber
                }).then((res) => {
                    console.log(res)
                    var modalInstance = $uibModal.open({
                        backdrop: false,
                        templateUrl: "templates/thank-you.html",
                        controller: 'thank-you',
                        resolve: {
                            details: function () {
                                return {
                                    res: res,
                                    cart_id: $scope.data.user.cart_id
                                }
                            },


                        },
                        size: '',
                    });
                    modalInstance.result.then(function (res) {
                        $location.path('/')
                    });
                    modalInstance.dismiss(() => {
                        console.log('main man')
                    });

                }).catch((err) => {
                    console.log(err)
                })
            }
        }

    }
    else {
        $location.path('/')
    }
})
storeApp.controller('itemModel', function ($uibModalInstance, $scope, item) {
    $scope.data = item
    $scope.amount = 0

    $scope.addToCart = function () {
        $uibModalInstance.close({
            item_id: item.id,
            amount: $scope.amount,
            price: item.price,
            total: item.price * $scope.amount
        });
    }
})
storeApp.controller('thank-you', function ($uibModalInstance, $scope, details) {
    $scope.data = details.res.data
    $scope.cart_id = details.cart_id
    $scope.amount = 0

    $scope.done = function () {
        $uibModalInstance.close(details);
    }
})