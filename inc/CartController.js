var Ctrl = require('./Controller.js');
var moment = require('moment');
const table = 'cart_items';

var read = Ctrl.Read(table);
var createCart = function(user_id){
    let cartData = {
        user_id:user_id,
        date:moment().format("YYYY-MM-DD"),
        active:1
    }
    return Ctrl.Create('carts')(cartData)
}
var updateCart = function(id,data){
    return Ctrl.Update('carts')(id,data)
}
var create = Ctrl.Create(table)
var remove = Ctrl.Delete(table);
var update = Ctrl.Update(table);
function add(params) {
    return new Promise(
        function (resolve, reject) {
    Ctrl.Find([params.cart_id,params.item_id], ['cart_id','item_id'], table).then((res) => {
       console.log(res[0].id)
        if (res.length>0) return  update(res[0].id, params)
        else return  create(params)

    }).then((responce)=>{
        console.log(responce)
        resolve(responce)}
    ).catch((err)=>{reject(err)})
    })
}
var readI = function (id) {
    return new Promise(
        function (resolve, reject) {
            Ctrl.Find(id, 'cart_id', table).then((res) => {
                if (res) if (res.length > 0) resolve(res)
                else {
                    var Err = new Error('404')
                    throw (newErr)
                }
            }).catch((err)=>{
                reject(err)
            })
        }
    )
}
module.exports.read = read;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.readI = readI;
module.exports.add = add;
module.exports.updateCart = updateCart;
module.exports.createCart = createCart;