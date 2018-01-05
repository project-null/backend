let DBController = require('./lib/common');

let config = { tableName: 'favorites' };
let Controller = new DBController(config);

module.exports = Controller;