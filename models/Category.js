const {getDb} = require("../config/db");
const {ObjectId} = require("mongodb");

class Category {
    static category() {
        const categories = getDb().collection("categories");
        return categories;
    }

    static create(payload) {
        return this.category().insertOne({
            ...payload,
        });
    }

    static findAll(id) {
        return this.category().find({userId: id}).toArray()
    }

    static findById(categoryId) {
        return this.category().findOne({_id: ObjectId(categoryId)});
    }

    static delete(categoryId) {
        return this.category().deleteOne({_id: ObjectId(categoryId)})
    }

}

module.exports = {Category}