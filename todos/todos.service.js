const Todo = require("./todos.model")

//Thsis function returns all the todos created by the user sorted by pending or completed tasks
const getTodosByUserId = async(userId, options = {}) => {
    let query = Todo.find({ userId })
     let sortOrder = {}; // Default sort order
    console.log(options)
 
    if (options.sortBy) {
        if (options.sortBy.startsWith('-')) {
            sortOrder[options.sortBy.substring(1)] = -1;
        } else {
            sortOrder[options.sortBy] = 1;
        }
    } else {
        sortOrder = { createdAt: -1 }; 
    }

    query.sort(sortOrder);

    const todos = await query.exec()
    return todos

}

const createTodo = async (task, userId) => {
    const createTodo = await Todo.create({ task, userId})

    return createTodo
}

const updateTodo = async = 

module.exports = {
    getTodosByUserId,
    createTodo
}