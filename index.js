require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// Routes
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to First Cry Clone" })
});
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"))
// app.use('/api', require('./routes/paymentRouter'))

// Connect to mongodb
const URI = process.env.MONGODBURL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
