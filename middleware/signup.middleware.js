const userModel = require("../model/user.model");

const signup = (req, res, next) => {
  const { username, email, dob, role, location, password, confirm_password } =
    req.body;

  if (
    !username ||
    !email ||
    !dob ||
    !role ||
    !location ||
    !password ||
    !confirm_password
  ) {
    res.status(206).send({ msg: "Invalid Data" });
    return;
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof dob !== "string" ||
    typeof role !== "string" ||
    typeof location !== "string" ||
    typeof password !== "string" ||
    typeof confirm_password !== "string"
  ) {
    res.status(206).send({ msg: "Invalid Data" });
    return;
  }
  if (password !== confirm_password) {
    res.status(206).send({ msg: "Password and Confirm Password is not same" });
    return;
  }
  next();
};
const login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(206).send({ msg: "Invalid Credentials" });
    return;
  }

  next();
};
const isUserExist = async (req, res, next) => {
  const id = req.params.id;
  try {
    const status = await userModel.findById({ _id: id });
    if (status) {
      next();
    } else {
      res.status(206).send({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error !", error_code: 57 });
  }
  return;
};
const isAuthrized = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];
  if (!token) {
    res.status(401).send({ msg: "You are not Authorized for this action" });
    return;
  } else {
    try {
      const status = await userModel.exists({
        $and: [{ token }, { role: "Admin" }],
      });
      if (status !== null) {
        next();
      } else {
        res.status(401).send({ msg: "You are not Authorized for this action" });
      }
    } catch (error) {
      res.status(500).send({ msg: "Internal Server Error !" });
    }
  }
};
module.exports = {
  signup,
  login,
  isUserExist,
  isAuthrized,
};