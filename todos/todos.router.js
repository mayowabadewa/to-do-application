const express = require("express")
const router = express.Router()

const todosController = require("./todos.controller")
const todosMiddleware = require("./todos.middleware")
const userMiddleware = require("../users/users.middleware")

router.use(userMiddleware.AuthorizeUser)

//Create a todo
router.post("/",todosMiddleware.CreateTodoValidator, todosController.createTodoController)
//Get todos
router.get("/", todosController.getTodosController)

//Update todo status
router.put("/:id", todosController.updateTodoStatusController)

module.exports = router;