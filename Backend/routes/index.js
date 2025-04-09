// backend/user/index.js
const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);

rootRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

module.exports = rootRouter;