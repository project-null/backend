let DBController = require('./lib/common');

let config = { tableName: 'user' };
let ffController = new DBController(config);

module.exports = ffController;