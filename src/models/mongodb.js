const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'dev';

const _dbClient = null;

module.exports = {
    mongodbClient: null,
    dbClient: null,
    async connect() {
        try {
            let mongodbClient = await MongoClient.connect(url);
            this.mongodbClient = mongodbClient;
            this.dbClient = mongodbClient.db(dbName);
            console.log(`connect mongodb success,address:${url}, dbName:${dbName}
            `);
        } catch (e) {
            console.error(`connect mongodb error ${e}`);
        }
    },
    close() {
        this.mongodbClient.close();
    },
    client() {
        return this.dbClient;
    }
}