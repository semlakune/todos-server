const {User} = require("../models/User");
const {Todo} = require("../models/Todo");
const {Category} = require("../models/Category")
const { compareSync } = require("bcryptjs")
const { sign } = require("jsonwebtoken")

class Controller {
    // users
    static register(req, res, next) {
        const {fullName, username, email, password, phoneNumber} = req.body;

        User.create({fullName, username, email, password, phoneNumber})
            .then((data) => {
                Category.create({name: "Work", userId: data.insertedId})
                res.status(201).json({_id: data.insertedId, email})
            }
        )
            .catch((err) => {
                next(err);
            });
    }

    static login(req, res, next) {
        const {username, password} = req.body
        User.findByUsername(username)
            .then((data) => {
                if (!data) throw { name: "invalid_username/password" }
                const checkPassword = compareSync(password, data.password)
                if (!checkPassword) throw { name: "invalid_username/password" }
                const payload = { id: data._id }
                const access_token = sign(payload, process.env.JWT_TOKEN)
                res.status(200).json({ access_token })
            })
            .catch((err) => {
                console.log(err)
                next(err)
            })
    }

    static findUserById(req, res, next) {
        User.findById(req.user.id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    // categories
    static createCategory(req, res, next) {
        const userId = req.user.id
        const { name } = req.body
        Category.create({ name, userId })
            .then((_) => {
                res.status(201).json({ message: "success add category: " + name })
            })
            .catch((err) => {
                console.log(err)
                next(err);
            });
    }

    static findCategories(req, res, next) {
        Category.findAll(req.user.id)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err);
            });
    }

    static findCategoryById(req, res, next) {
        const { categoryId } = req.params
        Category.findById(categoryId)
            .then((data) => {
                if (!data) throw { name: "not_found" }
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static deleteCategory(req, res, next) {
        const { categoryId } = req.params
        Category.delete(categoryId)
            .then((_) => {
                res.status(200).json({ message: "success delete category" })
            })
            .catch((err) => {
                next(err);
            });
    }

    // todos
    static createTodo(req, res, next) {
        const userId = req.user.id
        const { task, categoryId } = req.body
        Todo.create({ task, categoryId, userId })
            .then((_) => {
                res.status(201).json({ message: "success add task: " + task })
            })
            .catch((err) => {
                next(err);
            });
    }

    static findTodos(req, res, next) {
        Todo.findAll(req.user.id)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err);
            });
    }

    static updateTodo(req, res, next) {
        const { taskId } = req.params
        const { status } = req.body
        Todo.update({ taskId, status })
            .then((_) => {
                res.status(200).json({ message: "success update task to: " + status })
            })
            .catch((err) => {
                next(err);
            });
    }

    static deleteTodo(req, res, next) {
        const { taskId } = req.params
        Todo.delete(taskId)
            .then((_) => {
                res.status(200).json({ message: "success delete task" })
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = {
    Controller,
};
