const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5596;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("your server is running...");
  });
});
