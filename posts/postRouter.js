const express = require("express");
const Posts = require("../controllers/PostControllers");
const postValidation = require("../middleware/PostValidator");
const validation = require("../middleware/UserValidator.js");

const router = express.Router();

router.get("/", Posts.getAllPosts);

router.get("/:id", postValidation.validatePostId, Posts.getPostById);

router.post("/:id/posts", postValidation.validatePost, Posts.createPost);

router.delete("/:id", postValidation.validatePostId, Posts.deleteUser);

router.put(
  "/:id",
  validation.validateUserId,
  postValidation.validatePostId,
  Posts.updatePost
);

// custom middleware

// function validatePostId(req, res, next) {}

module.exports = router;
