const express=require("express");
const router=express.Router();
const path = require("path");
const fs=require("fs");



//get all a2oj ladders
router.get("/",async(req,res)=>{
    try{
    ladders = [];
     const getLadders=async()=>{
        ladders.push({id:4,name:"Div 2A"});
        ladders.push({id:5,name:"Div 2B"});
        ladders.push({id:6,name:"Div 2C"});
        ladders.push({id:7,name:"Div 2D"});
        ladders.push({id:8,name:"Div 2E"});
        ladders.push({id:9,name:"Div 1D"});
        ladders.push({id:10,name:"Div 1E"});
        ladders.push({ id: 11, name:"Codeforces Rating < 1300"});
        ladders.push({ id: 12, name:"1300 <= Codeforces Rating <= 1399"});
        ladders.push({ id: 13, name:"1400 <= Codeforces Rating <= 1499"});
        ladders.push({ id: 14, name:"1500 <= Codeforces Rating <= 1599"});
        ladders.push({ id: 15, name:"1600 <= Codeforces Rating <= 1699"});
        ladders.push({ id: 16, name:"1700 <= Codeforces Rating <= 1799"});
        ladders.push({ id: 17, name:"1800 <= Codeforces Rating <= 1899"});
        ladders.push({ id: 18, name:"1900 <= Codeforces Rating <= 1999"});
        ladders.push({ id: 19, name:"2000 <= Codeforces Rating <= 2099"});
        ladders.push({ id: 20, name:"2100 <= Codeforces Rating <= 2199"});
        ladders.push({ id: 21, name:"Codeforces Rating >= 2200"});
    }
    await getLadders(); 
    res.status(200).json(ladders);
    }catch(err){
        res.status(500).json(err);
    }
});


//get a specific ladder
router.get("/:id",async(req,res)=>{
    try{
        const dirPath=path.join(__dirname + "/../data/a2ojLadders");
        fs.readdir(dirPath,async(err,files)=>{
            let fileName="";
            try{
                for(let i=0;i<files.length;i++){
                    let len = files[i].length;
                    let j = 0;
                    let num = 0;
                    while (j < len && files[i][j] !== "-") {
                        if (files[i][j] >= "0" && files[i][j] <= "9") {
                            num = (num * 10) + Number(files[i][j] - "0");
                        }
                        j++;
                    }
                    if (num == req.params.id) {
                        fileName = files[i];
                        break;
                    }
                }
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }
            fs.readFile(path.join(dirPath + "/" + fileName), 'utf-8',(err,data)=>{
                if(err){
                    throw err;
                }
                res.status(200).json(JSON.parse(data));
            });
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});









module.exports=router;