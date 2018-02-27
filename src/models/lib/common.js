import dbClient from './mongodb';
import { ObjectID } from 'mongodb';
import uuid from 'node-uuid';

class Index {
    constructor(config) {
        this.tableName = config.tableName;
    }

    genUUID(objects) {
        objects.uuid = uuid.v4();
    }

    getCollection() {
        return dbClient.client().collection(this.tableName);
    }

    getObjectID(id) {
        try {
            const _id = new ObjectID(id);
            return _id;
        } catch (e) {
            throw 'id不合法'
        }
    }

    async save(object) {
        return this.getCollection().insertOne(object);
    }

    async getAll(filter) {
        return this.getCollection().find(filter).toArray();
    }

    async get(id) {
        let _id = this.getObjectID(id);
        return this.getCollection().findOne({ _id });
    }
    async getOneByKey(obj) {
        return this.getCollection().findOne(obj);
    }

    async update(id, object) {
        const _id = this.getObjectID(id);
        delete object._id
        return this.getCollection().updateOne({ _id }, { $set: object });
    }

    async delete(id) {
        try {
            const _id = this.getObjectID(id);
            return this.getCollection().removeOne({ _id });
        } catch (e) {
            throw e;
        }
    }
    async deleteOneByKey(key) {
        return this.getCollection().removeOne(key);
    }
}
export default Index;