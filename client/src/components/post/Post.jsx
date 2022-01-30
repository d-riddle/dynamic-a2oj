import { Link } from 'react-router-dom';
import './Post.css'

function Post({ post }) {
    return (
        <div className="post">
            <div className='postInfo'>
                <span className="postName"><Link className='Link' to={`/${post.name === "A2oj Ladders" ? "a2oj" : "kartik"}`}>{post.name}</Link></span>
            <span className="postAuthor">Author: {post.author}</span>
            </div>
            <img className="postImg" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
        </div>
    );
}

export default Post;