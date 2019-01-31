var Ctrl = require('./Controller.js');
const Joi = require('joi');
var moment = require('moment');
const schema = {
    cart_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    final_price: Joi.number().integer().required(),
    shipping_city: Joi.string().min(2).max(30).required(),
    shipping_street: Joi.string().min(2).max(30).required(),
    shipping_date: Joi.date(),
    card: Joi.string()
}
const table = 'orders';

var read = Ctrl.Read(table);
var create = function (data) {
    return new Promise(function (resolve, reject) {
        Joi.validate(data, schema, (error, value) => {
            console.log(error)
            console.log('error')
            if (error){
                console.log('hello')
                reject(error)
            } 
            else {
                 data.order_date = moment().format("YYYY-MM-DD");
                data.last_digits = '1234'
                delete data.card;
                console.log('hello')
                console.log(data)
            Ctrl.Create(table)(data).then((rows)=>{
                console.log(rows)
                if(rows.affectedRows==1){
                    resolve(rows)
                }
            }).catch((err)=>{
                console.log('error '+err)
                reject('error '+err)
            })

        }
        })
    

    })
}
var remove = Ctrl.Delete(table);
var update = Ctrl.Update(table);
var getReceipt = function(id){
    return new Promise(
        function(resolve,reject){
         

        }
    )
}
module.exports.read = read;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.getReceipt = getReceipt;