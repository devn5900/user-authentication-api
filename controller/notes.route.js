const { Router } = require("express");
const { isAuthrized } = require("../middleware/signup.middleware");
const { NotesModel } = require("../model/notes.model");
const notesRouter = Router();

notesRouter.get("/", isAuthrized, async (req, res) => {
  try {
    const status = await NotesModel.find({ userID: req.body.userID });
    res.status(200).send(JSON.stringify(status));
  } catch (error) {
    res.status(200).send({ msg: "something wen wrong" });
  }
});

notesRouter.post("/add", isAuthrized, async (req, res) => {
  try {
    const status = await NotesModel(req.body);
    const response = await status.save();
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    res.status(200).send({ msg: "something wen wrong" });
  }
});
notesRouter.patch("/edit/:id", isAuthrized, async (req, res) => {
  const id = req.params.id;
  try {
    const status = await NotesModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).send(JSON.stringify(status));
  } catch (error) {
    res.status(200).send({ msg: "something wen wrong" });
  }
});
notesRouter.delete("/delete/:id", isAuthrized, async (req, res) => {
  const id = req.params.id;
  try {
    const status = await NotesModel.findOneAndDelete({
      _id: id,
      userID: req.body.userID,
    });
    res.status(200).send({ msg: "data deleted" });
  } catch (error) {
    res.status(200).send({ msg: "something wen wrong" });
  }
});
module.exports = {
  notesRouter,
};
