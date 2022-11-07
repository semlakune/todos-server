const {Controller} = require('../controllers');
const router = require('express').Router()
const authc = require("../middlewares/authc")
const authz = require("../middlewares/authz")

router.post("/register", Controller.register)
router.post("/login", Controller.login)

/* authentication */
router.use(authc)
/* authentication */

router.post("/todos", Controller.createTodo)
router.get("/todos", Controller.findTodos)
router.get("/users/:userId", Controller.findUserById)
router.patch("/todos/:taskId", Controller.updateTodo)
router.delete("/todos/:taskId", authz, Controller.delete)

module.exports = {
    router
};
