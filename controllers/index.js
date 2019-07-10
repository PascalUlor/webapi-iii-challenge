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

module.exports = {
  getAllUsers
};
