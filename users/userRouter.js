const express = require("express");
const Users = require("../controllers");
const validation = require("../middleware");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", Users.getAllUsers);

router.get("/:id", validation.validateUserId, Users.getUserById);

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
