const Users = require("../users/userDb");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.get();
    if (allUsers) {
      return res.status(200).json({
        status: 200,
        data: allUsers
      });
    }
    return res.status(404).json({
      status: 404,
      message: "No users available"
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "Users could not be retrieved."
    });
  }
};

const getById = async (res, id, statusCode) => {
  try {
    const user = await Users.getById(id);
    if (user) {
      return res.status(200).json({
        status: statusCode,
        data: user
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "The user with the specified ID does not exist."
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  return getById(res, id, 200);
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const newUser = await Users.insert({ name });
      return getById(res, newUser.id, 201);
    }
    return res.status(400).json({
      status: 400,
      errorMessage: "Please provide title and contents for the post."
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "There was an error while saving the post to the database"
    });
  }
};

const getPostByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userPost = await Users.getUserPosts(id);
    if (Object.keys(userPost).length !== 0) {
      return res.status(200).json({
        status: 200,
        posts: userPost
      });
    }
    return res.status(404).json({
      status: 404,
      message: "user has no posts"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "There was an error retrieving post from database"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.params.id;
    const user = await Users.getById(userId);
    if (Object.keys(user).length !== 0) {
      if (name) {
        const userUpdate = await Users.update(userId, { name });
        return getById(res, userId, 200);
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide name for user."
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "The user information could not be modified."
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.getById(userId);
    if (Object.keys(user).length !== 0) {
      const removeUser = await Users.remove(userId);
      return res.status(200).json({
        status: 200,
        data: removeUser
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getPostByUser,
  updateUser,
  deleteUser
};
