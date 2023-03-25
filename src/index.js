const express = require("express");
const cors = require("cors");
const userRouter = require("../controller/user.routes");
const { connectionDB } = require("../connection/db.con");
const morgan = require("morgan");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { notesRouter } = require("../controller/notes.route");

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
//     ":method :url :status :res[content-length] - :response-time ms :date[web] ",
//     {
//       stream: accessLogStream,
//     }
//   )
// );
/*************************************************************/
app.use(express.json());
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.get("/", (req, res) => {
  res.send(`Welcome to User's API`);
});
app.all("*", (req, res) => {
  res.send("Not Found");
});
app.listen(process.env.port, () => {
  console.log(`server is running on localhost:${process.env.port}`);
  connectionDB();
});
