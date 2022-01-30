const express = require("express");
const app = express();
const dotenv=require("dotenv");

//const a2ojRoute=require("./routes/a2oj");
const laddersRoute=require("./routes/ladders");
const loginRoute=require("./routes/login");
const updateSubRoute=require("./routes/updateSub");

dotenv.config();
app.use(express.json());



app.use("/api/ladders",laddersRoute);
app.use("/api/login",loginRoute);
app.use("/api/updatesub",updateSubRoute);
//app.use("/api/a2oj",a2ojRoute);


app.listen(process.env.PORT||5000, () => {
    console.log("backend is running");
});