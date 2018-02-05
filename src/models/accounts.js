let DBController = require('./lib/common');

let config = { tableName: 'accounts' };
let Controller = new DBController(config);

module.exports = Controller;