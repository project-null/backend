const dbClient = require('./mongodb');
const ObjectID = require('mongodb').ObjectID;

class Index {
    constructor(config) {
        this.tableName = config.tableName;
    }

    getCollection() {
        return dbClient.client().collection(this.tableName);
    }

    async save(object) {
        return this.getCollection().insertOne(object);
    }

    async getAll(filter) {
        return this.getCollection().find(filter).toArray();
    }

    async get(id) {
        const _id = new ObjectID(id);
        return this.getCollection().findOne({ _id });
    }
    async getOneByKey(obj) {
        return this.getCollection().findOne(obj);
    }

    async update(id, object) {
        const _id = new ObjectID(id);
        delete object._id
        return this.getCollection().updateOne({ _id }, { $set: object });
    }

    async delete(id) {
        const _id = new ObjectID(id);
        return this.getCollection().removeOne({ _id });
    }
}

module.exports = Index
