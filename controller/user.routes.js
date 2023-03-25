const { Router } = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const {
  signup,
  login,
  isUserExist,
  isAuthrized,
} = require("../middleware/signup.middleware");
const router = Router();

/***********************Signup Route**************************/
router.use("/signup", signup); // singup middleware
router.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const status = new userModel(data);
    await status.save();
    res.status(200).send({ msg: "Singedup Successfully !" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});
/************************************************************/
/***********************Login Route*************************************/
router.use("/login", login); // login middleware
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    //  db.users.find({ $and: [{ email: "Devn" }, { password: "dev" }] });
    const status = await userModel.findOne({
      $and: [{ email }, { password }],
    });
    if (status !== null) {
      const token = jwt.sign(
        { _id: status._id, username: status.username },
        "devn",
        (err, code) => {
          if (code) {
            res.status(202).send(JSON.stringify({ token: code }));
          } else {
            res.status(400).send({ msg: "Signup First" });
          }
        }
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
router.get("/user/:id", (req, res) => {
  res.send("get");
});
/************************************************************/
router.use("/", isAuthrized); // Authorization middleware

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
