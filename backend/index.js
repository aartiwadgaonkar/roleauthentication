const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connect } = require("./config/db");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
connect()
app.use("/auth", require("./routes/authRoute"))
app.use("/user", require("./routes/userRoute"))
app.use("/role", require("./routes/roleRoute"))
app.listen(5000,()=>{console.log("server running");
})