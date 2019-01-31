
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
    this.saveInitialdata = function (data) {
        localStorage.setItem('Idta', JSON.stringify(data))
    }
    this.getInitialdata = function (data) {
        return JSON.parse(localStorage.getItem('Idta'))
    }
    this.getShopData = function () {
        return Get('start_shopping')
    }
    this.getCitems = function (id) {
        return Get('category/items/' + id)
    }
    this.getCartItems = function () {
        return Get('cart_items')

    }
    this.updateCartItem=function(data){
        let Citem = {
            item_id:data.item_id,
            amount:data.amount,
            price:data.price,
            total:data.total,
            cart_id:data.cart_id
        }
        return Put('cart_item/'+data.id,Citem)
    }
    this.deleteCartItem =function(id){
           
        return Delete('cart_item/'+id)
    }
    this.postCartItem = function (data) {
        return Post('cart_items', data)
    }
    this.Order = function (data) {
        return Post('order', data)
    }
    function Post(url, data) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/' + url,
            type: 'application/x-www-form-urlencoded',
            data: data
        })
    }
    function Put(url, data) {
        return $http({
            method: 'PUT',
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
    function Delete(url) {
        return $http({
            method: 'DELETE',
            url: 'http://localhost:8081/' + url,
            type: 'application/x-www-form-urlencoded',
        })
    }
})