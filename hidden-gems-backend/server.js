const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");
const treasureRouter = require("./routes/treasures");

app.use("/users", userRouter);
app.use("/treasures", treasureRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
