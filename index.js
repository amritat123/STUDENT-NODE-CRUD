const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
require("./api/config/db");

const studentRoutes = require("./api/route/student");

mongoose.Promise = global.Promise;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/student/", studentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app running on port ${port}`));
