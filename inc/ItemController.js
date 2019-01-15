var Ctrl = require('./Controller.js');
const table ='items';

var read = Ctrl.Read(table);
var create = Ctrl.Create(table);
var remove = Ctrl.Delete(table);
var update = Ctrl.Update(table);

module.exports.read = read;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;