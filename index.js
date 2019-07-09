// implement your API here
const express = require('express') //import express

const Users = require("./data/db.js") //import server

const server = express(); //start server

server.use(express.json()); //tells server to parse JSON

//GET function returns all users.
server.get("/users", (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved." })
        })
})

//GET function returns specific ID
server.get("/users/:id", (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if (id) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "User not found" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//POST function to add a new user 
server.post('/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    Users.insert(userInfo)
        .then(user => {
            if (req.body.name && req.body.bio) {
                res.status(201).json(userInfo);

            } else {
                res.status(400).json({ message: "Name and Bio are required" })
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//DELETE function to delete a user
server.delete("/users/:id", (req, res) => {
    const { id } = req.params

    Users.remove(id)
        .then(user => {
            if (user) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: "User Not Found or Already Deleted" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

//PUT function to update a user
server.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    Users.update(id, updatedUser)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: "User Not Found" })
            }
        })
        .catch(err => {
            res.status(500).json(error)
        })
})

const port = 5000;
server.listen(port, () => console.log(`running on ${port}`)) //tell server to listen