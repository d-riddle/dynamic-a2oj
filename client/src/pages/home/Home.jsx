import { useContext, useEffect, useState } from 'react';
import './Home.css';
import { useLocation } from "react-router";
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

function Home() {
    const [posts, setPosts] = useState([]);
    const { search} = useLocation();
    console.log(search);
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [errorMessage,setErrorMessage]=useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            setErrorMessage("");
            try{
                const res = await axiosInstance.get("/ladders" + search);
                console.log(res.data);
                setPosts(res.data);
                setLoading(false);
            }catch(err){
                setErrorMessage(err.response.data);
                setLoading(false);
            }
        }
        fetchPosts();
    },[search]);
    return (loading ? (<div className='loader'><i className="fas fa-refresh fa-spin fa-pulse fa-9x fa-fw"></i></div>):(errorMessage?(<h1>{errorMessage}</h1>):(
        <div className="home">
            <div className='headerTitle'>
                <span className='headerUser'>[{user.result[0].handle}]</span>
            </div>
            <div className='homeBody'>
                <table className='hometable'>
                    <thead>
                        <tr>
                            <th className='homeBodyth'>Id</th>
                            <th className='homeBodyth'>Name</th>
                            <th className='homeBodyth'>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts&&posts.map((p)=>(
                            <tr className='hometableBodyRow'>
                                <td className='homeBodytr'>{p.id}</td>
                                <td className='hometableBodyRowElementName homeBodytr'><Link className='Link' to={`/${p.name === "A2oj Ladders" ? "a2oj" : "kartik"}`}>{p.name}</Link></td>
                                <td className='homeBodytr'>{p.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <Posts posts={posts} /> */}
        </div>
    )));
}

export default Home;