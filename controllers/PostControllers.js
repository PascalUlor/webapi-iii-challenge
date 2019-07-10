const Posts = require("../posts/postDb");
const Users = require("../users/userDb");

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

const updatePost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const post = await Posts.getById(postId);
    if (Object.keys(post).length !== 0) {
      if (text) {
        const postUpdate = await Posts.update(postId, { text });
        return getById(res, postId, 200);
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide text for post."
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "The post information could not be modified."
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.getById(postId);
    console.log(post);
    if (Object.keys(post).length !== 0) {
      const removePost = await Posts.remove(postId);
      return res.status(200).json({
        status: 200,
        data: removePost
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "The user could not be removed"
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.params.id;
    const user = await Users.getById(userId);
    console.log(text);
    if (Object.keys(user).length !== 0) {
      if (text) {
        const newPost = await Posts.insert({ text, user_id: userId });
        return res.status(200).json({
          status: 200,
          data: newPost
        });
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide text for the post."
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "There was an error while saving the post to the database"
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  deleteUser,
  createPost
};
