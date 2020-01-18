// implement your API here

const express = require("express");
const db = require("./data/db.js");

const server = express();
const cors = require("cors");

server.listen(5000, () => {
  console.log("*** listening on port 5000");
});

//============Global Middleware Section=================
server.use(express.json());
server.use(cors());
//============End of Global Middleware Section=================

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("body req", userInfo);
  db.insert(userInfo)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({
          success: false,
          message: "Please provide name and bio for the user."
        });
      } else {
        res.status(201).json({ success: true, user });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The users information could not be retrieved."
      });
    });
});

//Get specific user
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          success: false,
          message: " The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The user information could not be retrieved."
      });
    });
});

// delete user

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, message: "The user could not be removed" });
    });
});

// update user

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const change = req.body;

  db.update(id, change)
    .then(userUpdated => {
      if (!userUpdated) {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      } else if (!userUpdated.name || !userUpdated.bio) {
        res.status(404).json({
          success: false,
          message: "Please provide name and bio for the user."
        });
      } else {
        res.status(200).json({ success: true, userUpdated });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The user information could not be modified."
      });
    });
});
