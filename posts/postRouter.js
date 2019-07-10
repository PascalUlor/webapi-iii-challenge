const express = require("express");
const Posts = require("../controllers/PostControllers");

const router = express.Router();

router.get("/", Posts.getAllPosts);

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
