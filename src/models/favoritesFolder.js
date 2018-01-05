let DBController = require('./lib/common');

let config = { tableName: 'favorites_folder' };
let ffController = new DBController(config);

module.exports = ffController;