import { MongoClient } from 'mongodb';
import util from '../../common/util';

const url = util.getConfig().mongodb.url;
const dbName = util.getConfig().mongodb.dbName;

export default {
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

