import DBController from './lib/common';

let config = { tableName: 'accounts' };
let Controller = new DBController(config);

export default Controller;