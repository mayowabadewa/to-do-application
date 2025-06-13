const TodoService = require("./todos.service")
const asyncHandler = require('express-async-handler');

const getTodosController = asyncHandler(async (req, res) => {
    const todos = await TodoService.getTodosByUserId(req.user._id)
    return res.status(200).json({
        message: "Todos fetched successfully",
        data: todos
    })
})


const createTodoController = asyncHandler(async (req, res) => {
    const { task } = req.body

    const response = await TodoService.createTodo(
        task, req.user._id
    );

    console.log(task, req._id)
    return res.status(201).json({
        message: "Todo created successfully",
        data: response
    })
})

module.exports = {
    getTodosController,
    createTodoController
}