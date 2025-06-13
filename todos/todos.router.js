const express = require("express")
const router = express.Router()

const todosController = require("./todos.controller")
const todosMiddleware = require("./todos.middleware")
const userMiddleware = require("../users/users.middleware")

router.use(userMiddleware.AuthorizeUser)

//Create a todo
router.post("/",todosMiddleware.CreateTodoValidator, todosController.createTodoController)

router.get("/", todosController.getTodosController)

module.exports = router;