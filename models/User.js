const {getDb} = require("../config/db");
const {ObjectId} = require("mongodb");
const {hashSync} = require('bcryptjs');


class User {
    static user() {
        const users = getDb().collection("users");
        return users;
    }

    static create(payload) {
        return this.user().insertOne({
            ...payload,
            password: hashSync(payload.password, 8)
        });
    }

    static findById(userId) {
        return this.user().findOne({_id: ObjectId(userId)}, {
            projection: {password: 0}
        });
    }

    static findByUsername(username) {
        return this.user().findOne({ username })
    }

}

module.exports = {
    User,
};