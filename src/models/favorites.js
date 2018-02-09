import DBController from './lib/common';

let config = { tableName: 'favorites' };
let Controller = new DBController(config);

export default Controller;