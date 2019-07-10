const Posts = require("../posts/postDb");

async function validatePostId(req, res, next) {
  const id = Number(req.params.id);
  if (id !== undefined && id !== "" && typeof id === "number") {
    post = await Posts.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "invalid user id"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "invalid id type"
    });
  }
}

module.exports = {
  validatePostId
};
