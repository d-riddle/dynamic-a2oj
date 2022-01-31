const express=require("express");
const router=express.Router();
const path = require("path");
const fs = require("fs");

// get all posts
router.get("/",(req,res)=>{
    const posts=[];
    try{
        posts.push({id:"1",name:"A2oj Ladders",author:"Ahmed Aly"});
        posts.push({id:"2",name:"Kartik Ladders",author:"Kartik Arora"});
        res.status(200).json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error!");
    }
});


//get the required ladderList
router.get("/:name", async (req, res) => {
    try {
        ladders = {};
        if(req.params.name==="a2oj"){
            ladders.name="A2oj Ladders";
            ladders.author="Ahmed Aly";
            ladders.categories=[];
        const getLadders = async () => {
            ladders.categories.push({ id: 4, name: "Div 2A" });
            ladders.categories.push({ id: 5, name: "Div 2B" });
            ladders.categories.push({ id: 6, name: "Div 2C" });
            ladders.categories.push({ id: 7, name: "Div 2D" });
            ladders.categories.push({ id: 8, name: "Div 2E" });
            ladders.categories.push({ id: 9, name: "Div 1D" });
            ladders.categories.push({ id: 10, name: "Div 1E" });
            ladders.categories.push({ id: 11, name: "Codeforces Rating < 1300" });
            ladders.categories.push({ id: 12, name: "1300 <= Codeforces Rating <= 1399" });
            ladders.categories.push({ id: 13, name: "1400 <= Codeforces Rating <= 1499" });
            ladders.categories.push({ id: 14, name: "1500 <= Codeforces Rating <= 1599" });
            ladders.categories.push({ id: 15, name: "1600 <= Codeforces Rating <= 1699" });
            ladders.categories.push({ id: 16, name: "1700 <= Codeforces Rating <= 1799" });
            ladders.categories.push({ id: 17, name: "1800 <= Codeforces Rating <= 1899" });
            ladders.categories.push({ id: 18, name: "1900 <= Codeforces Rating <= 1999" });
            ladders.categories.push({ id: 19, name: "2000 <= Codeforces Rating <= 2099" });
            ladders.categories.push({ id: 20, name: "2100 <= Codeforces Rating <= 2199" });
            ladders.categories.push({ id: 21, name: "Codeforces Rating >= 2200" });

            ladders.categories.push({ id: 22, name: "Codeforces Rating < 1300 (Extra)" });
            ladders.categories.push({ id: 23, name: "1300 <= Codeforces Rating <= 1399 (Extra)" });
            ladders.categories.push({ id: 24, name: "1400 <= Codeforces Rating <= 1499 (Extra)" });
            ladders.categories.push({ id: 25, name: "1500 <= Codeforces Rating <= 1599 (Extra)" });
            ladders.categories.push({ id: 26, name: "1600 <= Codeforces Rating <= 1699 (Extra)" });
            ladders.categories.push({ id: 27, name: "1700 <= Codeforces Rating <= 1799 (Extra)" });
            ladders.categories.push({ id: 28, name: "1800 <= Codeforces Rating <= 1899 (Extra)" });
            ladders.categories.push({ id: 29, name: "1900 <= Codeforces Rating <= 1999 (Extra)" });
            ladders.categories.push({ id: 30, name: "2000 <= Codeforces Rating <= 2099 (Extra)" });
            ladders.categories.push({ id: 31, name: "2100 <= Codeforces Rating <= 2199 (Extra)" });
            ladders.categories.push({ id: 32, name: "Codeforces Rating >= 2200 (Extra)" });
        }
            await getLadders();
    } else {
        ladders.name="Kartik Ladders";
        ladders.author="Kartik Arora";
        ladders.categories=[];
            const getLadders = async () => {
                ladders.categories.push({ id: 1, name: "Kartik Specialist Sheet" });
                ladders.categories.push({ id: 2, name: "Kartik Expert Sheet" });

                ladders.categories.push({ id: 3, name: "Kartik Specialist Sheet (Extra 1)" });
                ladders.categories.push({ id: 4, name: "Kartik Expert Sheet (Extra 1)" });
            }
            await getLadders();
    }
        res.status(200).json(ladders);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error!");
    }
});

// function waitTime(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

//get the specific ladder
router.get("/:name/:id", async (req, res) => {
    try {
        let dirPath = "";
        if(req.params.name==="a2oj"){
            dirPath = path.join(__dirname + "/../data/a2ojLadders");
        }
        else {
            dirPath = path.join(__dirname + "/../data/karthikLadders");
        }
        fs.readdir(dirPath, async (err, files) => {
            if(err){
                console.log(err);
                res.status(500).json("Internal Server Error!");
            }else {
            let fileName = "";
            try {
                for (let i = 0; i < files.length; i++) {
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
            } catch (err) {
                console.log(err);
                res.status(500).json("Internal Server Error!");
            }
            fs.readFile(path.join(dirPath + "/" + fileName), 'utf-8', async(err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("Internal Server Error!");
                }else {
                    res.status(200).json(JSON.parse(data));
                    // let questions=JSON.parse(data);
                    // await waitTime(2000);
                    // let submissions =await axios.get("https://codeforces.com/api/user.status?handle="+req.body.username);
                    // //console.log(submissions);
                    // const getStatus=async()=>{
                    //     for (let i = 0; i < questions.length; i++) {
                    //         let contestId = questions[i].questionLink.split("/")[5];
                    //         let qCategory = questions[i].questionLink.split("/")[6];
                    //         questions[i].status = "NOT_FOUND";
                    //         for (let j = 0; j <submissions.data.result.length;j++) {
                    //             let sub=submissions.data.result[j];
                    //             if (sub.contestId == contestId && qCategory == sub.problem.index) {
                    //                 if (sub.verdict == "OK") {
                    //                     questions[i].status = "OK";
                    //                     break;
                    //                 } else {
                    //                     questions[i].status = "WRONG";
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                    // getStatus().then(()=>{
                    //     res.status(200).json(questions);
                    // }).catch((err)=>{
                    //     console.log(err);
                    //     res.status(500).json("Internal Server Error!");
                    // })

                }
            });
        }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error!");
    }
});

module.exports=router;