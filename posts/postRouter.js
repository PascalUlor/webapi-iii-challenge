const express = require("express");
const Posts = require("../controllers/PostControllers");
const postValidation = require("../middleware/PostValidator");

const router = express.Router();

router.get("/", Posts.getAllPosts);

router.get("/:id", postValidation.validatePostId, Posts.getPostById);

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

// function validatePostId(req, res, next) {}

module.exports = router;
