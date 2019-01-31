storeApp.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "pages/mainpage.html",
            controller: 'mainpagecontroller',
        })
        .when("/register", {
            templateUrl: "pages/register.html"
        })
        .when('/store', {
            templateUrl: 'pages/store.html',
            controller: 'store',
            resolve: {
                load: function (ApiCall) {
                    return ApiCall.load().then((res) => {
                        return res;
                    }).catch((err)=>{
                        templateUrl = "pages/error.html"
                    })
                }
            }
        })
        .when('/checkout', {
            templateUrl: 'checkout.html',
            controller: 'checkout',
            resolve: {
                load: function (ApiCall) {
                    return ApiCall.load().then((res) => {
                        return res;
                    })
                }
            }
        })
        .when('/dashbored', {
            templateUrl: '/dashbored.html'
        })


})