const { Todo } = require("../models/Todo")
const { Category } = require("../models/Category")
const {ObjectId} = require("mongodb");

function todoAuthz(req, res, next) {
    const { taskId } = req.params;
    Todo.findById(taskId)
        .then((data) => {
            if (!data) throw { name: "not_found" }
            if (data.userId.toString() !== req.user.id.toString()) throw { name: "forbidden" }
            next()
        })
        .catch((err) => {
            next(err)
        })
};

function categoryAuthz(req, res, next) {
    const { categoryId } = req.params;
    Category.findById(categoryId)
        .then((data) => {
            if (!data) throw { name: "not_found" }
            if (data.userId.toString() !== req.user.id.toString()) throw { name: "forbidden" }
            next()
        })
        .catch((err) => {
            next(err)
        })
};

module.exports = {
    todoAuthz,
    categoryAuthz
}
