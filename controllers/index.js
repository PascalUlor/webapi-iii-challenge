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
    console.log(user);
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
  console.log(id);
  return getById(res, id, 200);
};

module.exports = {
  getAllUsers,
  getUserById
};
