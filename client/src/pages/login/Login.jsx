import "./Login.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

function Login(){
    const [username, setUsername] =useState("");
    const { dispatch, isFetching } = useContext(Context);
    const [errorMessage,setErrorMessage]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrorMessage("");
        console.log(username);
        dispatch({ type: "LOGIN_START" });
        try{
            const res=await axiosInstance.post("/login",{
                username:username
            });
            console.log(res.data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }catch(err){
            setErrorMessage(err.response.data);
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return(
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Codeforces Username:</label>
                <input type="text" className="loginInput" placeholder="Enter your Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <button className="loginButton" type="submit" disabled={isFetching}><Link to="/login" className="Link">Login</Link></button>
            </form>
            {errorMessage && <span style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{errorMessage}</span>}
        </div>
    );
}

export default Login;