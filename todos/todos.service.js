const Todo = require("./todos.model")

const createTodo = async (task, userId) => {
    const createTodo = await Todo.create({ task, userId})

    return createTodo
}
const getTodosByUserId = async (userId, sortOption, status) => {
  const queryFilter = { userId };

  if (status === "completed" || status === "pending") {
    queryFilter.status = status;
  }

  const todos = await Todo.find(queryFilter).sort(sortOption).exec();
  return todos;
};

const updateTodoStatus = async (userId, todoId, status) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, userId },
    { status },
    { new: true }
  );
  return todo;
};


// const updateTodo = async = 

module.exports = {
    getTodosByUserId,
    createTodo,
    updateTodoStatus
}