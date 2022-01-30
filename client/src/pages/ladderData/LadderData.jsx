import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import "./LadderData.css";

function LadderData(){
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    let path = [location.pathname.split('/')[1], location.pathname.split('/')[2]];
    const [ladderData, setLadderData] = useState([]);
    const [ladderCategory,setLadderCategory]=useState("");
    const [author,setAuthor]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    //console.log(path);
    const { user} = useContext(Context);
    let resQuestions,resSub;
    const updateStatus=async()=>{
        try{
            let i;
            for (i = 0; i < resQuestions.data.length; i++) {
                let contestId = resQuestions.data[i].questionLink.split("/")[5];
                let qCategory = resQuestions.data[i].questionLink.split("/")[6];
                resQuestions.data[i].status = "NOT_FOUND";
                for (let j=0;j<resSub.data.result.length;j++) {
                    let sub=resSub.data.result[j];
                    if (sub.contestId == contestId && qCategory == sub.problem.index) {
                        if(sub.verdict=="OK"){
                            resQuestions.data[i].status="OK";
                            break;
                        }else {
                            resQuestions.data[i].status="WRONG";
                        }
                    }
                }
            }
            console.log("inside update completed"+i);
        }catch(err){
            console.log(err);
            setErrorMessage("Internal Server Error!");
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log("useEffect rendered");
        setErrorMessage("");
        const getLadderData = async () => {
            try{
                resQuestions = await axiosInstance.get("/ladders/" + path[0] + "/" + path[1]);
                const resLadderInfo = await axiosInstance.get("/ladders/" + path[0]);

                const result = resLadderInfo.data.categories.filter((p) => { return (p.id == path[1]) })[0].name;
                resSub = await axiosInstance.post("/updatesub/" + user.result[0].handle);

                updateStatus().then(() => {
                    console.log("finished");
                    setLadderData(resQuestions.data);
                    setLadderCategory(result);
                    setAuthor(resLadderInfo.data.author);
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setErrorMessage("Internal Server Error!");
                    setLoading(false);
                });
            }catch(err){
                console.log(err);
                if(err.response.data){
                    setErrorMessage(err.response.data);
                }else {
                    setErrorMessage("Internal Server Error!");
                }
                setLoading(false);
            }
            
        }
        getLadderData();
    }, path);

    return (loading?(<div className='Loader'><i className="fas fa-refresh fa-spin fa-pulse fa-9x fa-fw"></i></div>):(errorMessage?(<h1>{errorMessage}</h1>):(
        <div className='ladderData'>
            <div className='ladderDataInfo'>
                <span className='ladderDataName'>{ladderCategory}</span>
                <span className='ladderDataAuthor'>Author: {author}</span>
                <span className='username'>[{user.result[0].handle}]</span>
            </div>
            <div className='ladderDataBody'>
                <table>
                    <thead>
                        <tr>
                            <th className='ladderDataBodyth'>Id</th>
                            <th className='ladderDataBodyth'>Problem Name</th>
                            {author && (author == "Kartik Arora" ? (<th className='ladderDataBodyth'>Rated</th>) : (<th className='ladderDataBodyth'>Difficulty</th>))}
                            <th className='ladderDataBodyth'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ladderData&&ladderData.map((p) => (
                            <tr className='ladderBodyRow'>
                                <td className='ladderDataBodytd'>{p.slno}</td>
                                <td className='ladderBodyRowElementName ladderDataBodytd'><a href={p.questionLink} target="_blank" rel='noreferrer noopener'>{p.questionName}</a></td>
                                {author && (author == "Kartik Arora" ? (<td className='ladderDataBodytd'>{p.rated}</td>) : (<td className='ladderDataBodytd'>{p.difficultyLevel}</td>))}
                                <td className='ladderBodyRowElementStatus ladderDataBodytd' data-status={p.status}>{p.status == "OK" ? (<i class="fas fa-check-circle"></i>) : (p.status == "NOT_FOUND" ? (<i class="fas fa-paper-plane"></i>) : (<i class="fas fa-times-circle"></i>))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )));
}


export default LadderData;