const TodoService = require("./todos.service");
const asyncHandler = require("express-async-handler");

// const getTodosController = asyncHandler(async (req, res) => {
//     const { order_by = "createdAt", order = "desc" } = req.query;
//     const userId = req.user._id;

//     // Allowed sort fields
//     const allowedSortFields = ["pending", "completed"]
//     const sortFields = allowedSortFields.includes(order_by) ? order_by : "createdAt";

//     const sortOrder = order === "asc" ? 1 : -1;

//   const sortOption = { [sortFields]: sortOrder };

//   const todos = await TodoService.getTodosByUserId(userId, sortOption);
//   res.status(200).json({
//     message: "Todos fetched successfully",
//     data: todos
//   });
// });

const getTodosController = asyncHandler(async (req, res) => {
  const { order_by = "createdAt", order = "desc", status } = req.query;
  const userId = req.user._id;

  // Allowed sort fields
  const allowedSortFields = ["createdAt", "status", "title"];
  const sortField = allowedSortFields.includes(order_by)
    ? order_by
    : "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortOption = { [sortField]: sortOrder };

  try {
    const todos = await TodoService.getTodosByUserId(
      userId,
      sortOption,
      status
    );
    res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
});

const createTodoController = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { task } = req.body;
  console.log(task);

  const response = await TodoService.createTodo(task, user._id);

  return res.status(201).json({
    message: "Todo created successfully",
    data: response,
  });
});

const updateTodoStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { status } = req.body;
  console.log(status);
  const userId = req.user._id;

  // Only allow these status values
  const allowedStatuses = ["pending", "completed", "deleted"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Status must be one of: ${allowedStatuses.join(", ")}`,
    });
  }

  const updatedTodo = await TodoService.updateTodoStatus(userId, id, status);

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found or unauthorized" });
  }

  res.status(200).json({
    message: "Todo status updated successfully",
    data: updatedTodo,
  });
});

module.exports = {
  updateTodoStatusController,
};

module.exports = {
  getTodosController,
  createTodoController,
  updateTodoStatusController,
};
