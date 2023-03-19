const express = require("express");
const cors = require("cors");
const userRouter = require("../controller/user.routes");
const { connectionDB } = require("../connection/db.con");
const morgan = require("morgan");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3030;
const app = express();
app.use(cors());
/*******************Logger Middleware*************************/
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "../access.log"),
//   {
//     flags: "a",
//   }
// );
// app.use(
//   morgan(
//     ":method :url :user-agent :status :res[content-length] - :response-time ms :date[web] ",
//     {
//       stream: accessLogStream,
//     }
//   )
// );
/*************************************************************/
app.use(express.json());
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send(`Welcome to User's API`);
});
app.all("*", (req, res) => {
  res.send("Not Found");
});
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
  connectionDB();
});
