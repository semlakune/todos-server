const { Todo } = require("../models/Todo")
const {ObjectId} = require("mongodb");

module.exports = function authz(req, res, next) {
    const { taskId } = req.params;
    Todo.findById(taskId)
        .then((data) => {
            if (!data) throw { name: "not_found" }
            if (data.userId.toString() !== req.user.id.toString()) throw { name: "forbidden" }
            next()
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
};
