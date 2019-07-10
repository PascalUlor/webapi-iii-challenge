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
      error: "The posts information could not be retrieved."
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
      const newUser = await User.insert({ name });
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

module.exports = {
  getAllUsers,
  getUserById
};
