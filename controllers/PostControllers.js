const Posts = require("../posts/postDb");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.get();
    if (allPosts) {
      return res.status(200).json({
        status: 200,
        data: allPosts
      });
    }
    return res.status(404).json({
      status: 404,
      message: "No posts available"
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "The posts information could not be retrieved."
    });
  }
};

const getById = async (res, id, statusCode) => {
  try {
    const post = await Posts.getById(id);
    if (post) {
      return res.status(200).json({
        status: statusCode,
        data: post
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "The post with the specified ID does not exist."
    });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  return getById(res, id, 200);
};

module.exports = {
  getAllPosts,
  getPostById
};
