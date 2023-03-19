const { Router } = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const {
  signup,
  login,
  isUserExist,
  isAuthrized,
  isLoggedin,
} = require("../middleware/signup.middleware");
const router = Router();

/***********************Signup Route**************************/
router.use("/signup", signup); // singup middleware
router.post("/signup", async (req, res) => {
  const data = req.body;
  let token = crypto.randomBytes(25);
  data.token = token.toString("hex") + Math.random() * 999 + Date.now();
  try {
    const status = new userModel(data);
    await status.save();
    res.status(200).send({ msg: "Singedup Successfully !" });
  } catch (error) {
    res.status(206).send({ msg: "Email is already Present" });
  }
});
/************************************************************/
/***********************Login Route*************************************/
router.use("/login", login); // login middleware
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    //  db.users.find({ $and: [{ username: "Devn" }, { password: "dev" }] });
    const status = await userModel.findOne({
      $and: [{ email }, { password }],
    });
    if (status !== null) {
      res.status(202).send(
        JSON.stringify({
          username: status.username,
          token: status.token,
          role: status.role,
        })
      );
    } else {
      res.status(404).send({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Invalid Credentials" });
  }
});
/************************************************************/

/***********************Single user**************************/
router.use("/singleuser", isLoggedin);
router.get("/singleuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const status = await userModel.findById({ _id: id });
    res.send(JSON.stringify(status));
  } catch (error) {
    res.send({ msg: "No user found" });
  }
});
router.use("/", isAuthrized); // Authorization middleware
/************************************************************/

/**************************Get All Users*********************************/
router.get("/allusers", async (req, res) => {
  try {
    const status = await userModel.find();
    res.send(JSON.stringify(status));
  } catch (error) {
    res.send("erro");
  }
});
/***********************************************************/

/*************************Add User***********************************/
router.use("/edit/:id", isUserExist); // user credential middleware
router.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const status = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...data } }
    );
    // console.log(status);
    res.status(202).send({ msg: "User details updated" });
  } catch (error) {
    res.status(206).send({ msg: "Invalid Credentials" });
  }
});
/************************************************************/
/************************Delete Users************************************/
router.use("/delete/:id", isUserExist); //user credential middleware
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const status = await userModel.findByIdAndDelete({ _id: id });
    res.status(202).send({ msg: "User Credentials Deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error !" });
  }
});
/*************************************************************************/

router.all("*", (req, res) => {
  res.send("Not Found");
});
module.exports = router;
