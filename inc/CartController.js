var Ctrl = require('./Controller.js');
var con = require('../database.js');
var moment = require('moment');
const table = 'cart_items';

var createCart = function (user_id) {
    let cartData = {
        user_id: user_id,
        date: moment().format("YYYY-MM-DD"),
        active: 1
    }
    return Ctrl.Create('carts')(cartData)
}
var updateCart = function (id, data) {
    return Ctrl.Update('carts')(id, data)
}
var create = Ctrl.Create(table)
var remove = Ctrl.Delete(table);
var update = Ctrl.Update(table);
function add(params) {
    return new Promise(
        function (resolve, reject) {
            Ctrl.Find([params.cart_id, params.item_id], ['cart_id', 'item_id'], table).then((res) => {
                if (res.length > 0) return update(res[0].id, params)
                else return create(params)

            }).then((responce) => {
                return read(params.cart_id)
            }
            ).then((res) => {
                resolve(res)
            }).catch((err) => { reject(err) })
        })
}
var read = function (id) {
    return new Promise(
        function (resolve, reject) {
            var query = `SELECT 
                cart_items.id,
                item_id,
                amount,
                cart_items.price,
                total,
                cart_id,
                name,
                category_id,
                pic_url
                FROM cart_items 
                RIGHT join items ON items.id = cart_items.item_id
                WHERE cart_id = `+ id

            console.log(query);
            con.executeQuery(query, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })


        }
    )
}
var initialize = function (obj) {
    return new Promise(
        function (resolve, reject) {
            if (obj.user.cart_id)  read(obj.user.cart_id).then((res)=>{
                obj.cart_items = res
                resolve(obj)
            }).catch((err)=>{
                reject(err)
            })
            else {
                console.log(obj.user.id)
                createCart(obj.user.id).then(
                    function (res) {
                        console.log(res)
                        if (res.insertId) {
                            obj.cart_items = null
                            obj.user.cart_id = res.insertId
                            resolve(obj)
                        }
                        else {
                            reject(res)
                        }
                    }
                )
            }
        })
}

module.exports.read = read;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.add = add;
module.exports.updateCart = updateCart;
module.exports.createCart = createCart;
module.exports.initialize = initialize;