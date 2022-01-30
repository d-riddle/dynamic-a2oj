const express = require("express");
const app = express();
const dotenv=require("dotenv");
const path = require("path");

//const a2ojRoute=require("./routes/a2oj");
const laddersRoute=require("./routes/ladders");
const loginRoute=require("./routes/login");
const updateSubRoute=require("./routes/updateSub");

dotenv.config();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.use("/api/ladders",laddersRoute);
app.use("/api/login",loginRoute);
app.use("/api/updatesub",updateSubRoute);
//app.use("/api/a2oj",a2ojRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT||5000, () => {
    console.log("backend is running");
});