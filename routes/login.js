const express = require("express");
const router = express.Router();
const axios =require("axios");
const jwt = require("jsonwebtoken");


function waitTime(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    });
}
// user login and getting user info
router.post("/",async(req,res)=>{
    try{
        await waitTime(2000);
        const user= await axios.get("https://codeforces.com/api/user.info?handles="+req.body.username);
        const accessToken = jwt.sign({
            username: user.data.result[0].handle,
        }, process.env.JWT_SECRET,
            { expiresIn: "1d" });
        console.log(user.data);
        res.status(200).json({...user.data,accessToken});
    }catch(err){
        if(err.response){
            console.log(err.response.data);
            res.status(500).json(err.response.data.comment);
        }else {
            res.status(500).json("Internal Server Error!");
        }
    }
});


module.exports=router;