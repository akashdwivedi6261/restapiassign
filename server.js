const express = require("express");
let users = require("./users.json")
const app = express();
let PORT = 8000
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.use(express.json())

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    console.log(id);
    const user = users.find((user) => user.id === Number.parseInt(id));
    console.log(user);
    res.json(user)
})

app.post("/users", (req, res) => {
  users.push(res.body);
  res.json(req.body)
})

app.patch("/users/:id", (req, res) => {
    const {id} = req.params;
    const {first_name} = req.body

    const user = users.find((user) => user.id === Number.parseInt(id))
    user.first_name = first_name;
    res.json(user)
})

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;

     users = users.filter((user) => user.id !== Number.parseInt(id))
     res.json(users)
})
app.listen(PORT, () => {
    console.log(`starting server at port: ${PORT}`);
})