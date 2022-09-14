/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./database");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.use("/api/post", require("./Backend/Routes/PostRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening at port:${port}`));
