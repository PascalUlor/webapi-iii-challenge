const Users = require("../users/userDb");

async function validateUserId(req, res, next) {
  const id = Number(req.params.id);
  if (id !== undefined && id !== "" && typeof id === "number") {
    user = await Users.getById(id);
    console.log(user);
    if (user) {
      req.user = user;
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
  validateUserId
};
