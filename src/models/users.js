const dbClient = require('./mongodb.js');
const assert = require('assert');


module.exports = {
    getUserTableClient() {
        const db = dbClient.client();
        const userTable = db.collection('user');
        return userTable;
    },

    async save(user) {
        userTable = this.getUserTableClient()
        let result = userTable.insert(user)
        return result;
    },

    async getAll() {
        userTable = this.getUserTableClient()
        let result = userTable.find().toArray();
        return result;
    },

    async getUserByLoginName(loginName) {
        return await this.getAll().then(list => {
            return list.filter(v => {
                if (v.loginName === loginName) {
                    return true;
                }
            });
        });
    },

}