const express = require("express");
const router = express.Router();
const axios =require("axios");


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
        res.status(200).json(user.data);
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