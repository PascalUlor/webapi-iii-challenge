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

function validatePost(req, res, next) {
  const { text } = req.body;
  console.log(req.body);
  if (Object.keys(req.body).length !== 0) {
    if (text) {
      req.user = text;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "missing text data"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "missing required text field"
    });
  }
}

module.exports = {
  validatePostId,
  validatePost
};
