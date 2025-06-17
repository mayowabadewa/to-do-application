const express = require("express");
require("dotenv").config()
const database = require("./config/database")
const usersRouter = require("./users/users.router")
const todosRouter = require("./todos/todos.router")

const app = express();

const PORT = process.env.PORT

//Connect to the database
database.connectDB()

//Using the express body parser
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Todo App")
})


app.use("/api/v1/users", usersRouter)
app.use("/api/v1/todos", todosRouter)

app.listen(PORT, ()=> {
    console.log(`Server is listening on localhost:${PORT}`)
});