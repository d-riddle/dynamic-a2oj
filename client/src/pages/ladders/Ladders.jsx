import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./Ladders.css";


function Ladders(){
    const location=useLocation();
    const [loading,setLoading]=useState(true);
    const path=location.pathname.split('/')[1];
    const [ladderList,setLadderList]=useState({});
    const [errorMessage,setErrorMessage]=useState("");
    console.log(path);
    useEffect(()=>{
        const getLadderList=async()=>{
            setErrorMessage("");
            try{
                const res = await axios.get("/ladders/" + path);
                console.log("hi");
                console.log(res.data);
                setLadderList(res.data);
                setLoading(false);
            }catch(err){
                setErrorMessage(err.response.data);
                setLoading(false);
            }
        }
        getLadderList();
    },[path]);
    const {user}=useContext(Context);
    console.log(ladderList.categories);
    return (loading ? (<div className='Loader'><i className="fas fa-refresh fa-spin fa-pulse fa-9x fa-fw"></i></div>):(errorMessage?(<h1>{errorMessage}</h1>):(
        <div className='ladders'>
            <div className='ladderInfo'>
                <span className="postname">{ladderList.name}</span>
                <span className="postauthor">Author: {ladderList.author}</span>
                <span className='username'>[{user.result[0].handle}]</span>
            </div>
            <div className='laddersList'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ladderList.categories&&ladderList.categories.map((p)=>(
                            <tr className='tableBodyRow'>
                                <td>{p.id}</td>
                                <td className='tableBodyRowElementName'><Link className='Link' to={ladderList.author=="Ahmed Aly"?`/a2oj/${p.id}`:`/kartik/${p.id}`}>{p.name}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )));
}

export default Ladders;