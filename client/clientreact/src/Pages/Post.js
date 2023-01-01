import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:1001/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftside">
        <div className="title">{post.title}</div>
        <div className="postText">{post.postText}</div>
        <div className="username">{post.username}</div>
      </div>
      <div className="rightside">Comment Section</div>
    </div>
  );
}

export default Post;
