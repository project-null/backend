let DBController = require('./lib/common');

let config = { tableName: 'favorites_folder' };
let Controller = new DBController(config);

module.exports = Controller;