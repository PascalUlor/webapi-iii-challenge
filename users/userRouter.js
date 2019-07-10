const express = require("express");
const Users = require("../controllers/UserControllers.js");
const validation = require("../middleware/UserValidator.js");

const router = express.Router();

router.post("/", validation.validateUser, Users.createUser);

// router.post("/:id/posts", (req, res) => {});

router.get("/", Users.getAllUsers);

router.get("/:id", validation.validateUserId, Users.getUserById);

router.get("/:id/posts", validation.validateUserId, Users.getPostByUser);

router.delete("/:id", validation.validateUserId, Users.deleteUser);

router.put("/:id", validation.validateUserId, Users.updateUser);

//custom middleware

// function validateUser(req, res, next) {}

// function validatePost(req, res, next) {}

module.exports = router;
