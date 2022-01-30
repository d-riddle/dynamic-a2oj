const express=require("express");
const router=express.Router();
const axios=require("axios");

function waitTime(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//update user submissions
router.post("/:username",async(req,res)=>{
    try{
        await waitTime(2000);
        const userSubmissions = await axios.get("https://codeforces.com/api/user.status?handle=" + req.params.username);
        res.status(200).json(userSubmissions.data);
    }catch(err){
        if (err.response) {
            console.log(err.response.data);
            res.status(500).json(err.response.data.comment);
        } else {
            console.log(err);
            res.status(500).json("Internal Server Error!");
        }
    }
});





module.exports=router;