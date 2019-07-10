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

async function validateUser(req, res, next) {
  const { name } = req.body;
  console.log(req.body);
  if (Object.keys(req.body).length !== 0) {
    if (name) {
      req.user = name;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "missing user data"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "missing required name field"
    });
  }
}
module.exports = {
  validateUserId,
  validateUser
};
