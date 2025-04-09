// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");

const app = express();

const port=process.env.PORT || 3000;
app.use(cors({
  origin: "https://paytm-frontend-ah2z.onrender.com", // or "*" for all origins (not recommended in production)
  credentials: true // if you're using cookies or auth headers
}));

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});