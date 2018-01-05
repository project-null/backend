const MongoClient = require('mongodb').MongoClient;
const util = require('../../common/util');

const url = util.getConfig().mongodb.url;
const dbName = util.getConfig().mongodb.dbName;

module.exports = {
    mongodbClient: null,
    dbClient: null,
    async connect() {
        let mongodbClient = await MongoClient.connect(url);
        this.mongodbClient = mongodbClient;
        this.dbClient = mongodbClient.db(dbName);
        console.log(`connect mongodb success,address:[${url}], dbName:[${dbName}]`);
    },
    close() {
        this.mongodbClient.close();
    },
    client() {
        return this.dbClient;
    }
}

