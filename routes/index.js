const {Controller} = require('../controllers');
const router = require('express').Router()
const authc = require("../middlewares/authc")
const {todoAuthz, categoryAuthz} = require("../middlewares/authz")

router.post("/register", Controller.register)
router.post("/login", Controller.login)

/* authentication */
router.use(authc)
/* authentication */

router.get("/users", Controller.findUserById)
router.post("/todos", Controller.createTodo)
router.get("/todos", Controller.findTodos)
router.post("/categories", Controller.createCategory)
router.get("/categories", Controller.findCategories)
router.get("/categories/:categoryId", Controller.findCategoryById)
router.patch("/todos/:taskId", Controller.updateTodo)
router.delete("/categories/:categoryId", categoryAuthz, Controller.deleteCategory)
router.delete("/todos/:taskId", todoAuthz, Controller.deleteTodo)

module.exports = {
    router
};
