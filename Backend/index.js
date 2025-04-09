// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");

const app = express();

const port=process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});