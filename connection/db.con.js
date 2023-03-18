const mongoose = require("mongoose");
require("dotenv").config();
const connectionDB = async () => {
  try {
    const status = mongoose.connect(process.env.db_url);
    console.log("Connected to the DB");
  } catch (error) {
    console.log("Not Connected to DB");
  }
};

module.exports = { connectionDB };
