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

module.exports = {
  getAllPosts
};
