const {getDb} = require("../config/db");
const {ObjectId} = require("mongodb");

class Todo {
    static todo() {
        const todos = getDb().collection("todos");
        return todos;
    }

    static create(payload) {
        return this.todo().insertOne({
            ...payload,
            status: "uncomplete"
        });
    }

    static findAll(id) {
        return this.todo().find({userId: id}).toArray()
    }

    static findByCategory(categoryId) {
        return this.todo().find({categoryId}).toArray()
        // return this.todo().aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "categoryId",
        //             foreignField: "_id",
        //             as: "todo_category"
        //         }
        //     },
        //     {
        //         $project: {
        //             _id : 1,
        //             task: 1,
        //             status: 1,
        //             categoryName: "$todo_category"
        //         }
        //     }
        // ]).toArray()
    }

    static findById(taskId) {
        return this.todo().findOne({_id: ObjectId(taskId)});
    }

    static update(payload) {
        return this.todo().updateOne({_id: ObjectId(payload.taskId)}, { $set: { status: payload.status } })
    }

    static delete(taskId) {
        return this.todo().deleteOne({_id: ObjectId(taskId)})
    }
}

module.exports = { Todo }