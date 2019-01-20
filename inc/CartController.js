var Ctrl = require('./Controller.js');
const table = 'cart_items';

var read = Ctrl.Read(table);
var create = Ctrl.Create(table);
var remove = Ctrl.Delete(table);
var update = Ctrl.Update(table);
function add(params) {
    return new Promise
    Ctrl.Find(params.cart_id, 'cart_id', table, (err, res) => {
        if (err) callback(err)
        if (res) if (res.params.id) {
            upate(cart_id, params, (err, res) => {
                if (err) callback(err)
                if (res) {
                    callback(res)
                  }
            })
        }
        else {
            create(params, (err, res) => {
                if (err) callback(err)
                if (res) {
                    callback(res)
                }
            })
        }
    })
}
var readI = function (id) {
    return new Promise(
        function (resolve, reject) {
            Ctrl.Find(id, 'cart_id', table, (err, res) => {
                if (err) reject(err)
                if (res) if (res.length > 0) resolve(res)
                else {
                    var newErr = new Error('404')
                    reject(newErr)
                }
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