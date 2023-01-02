import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Post.css";

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get(`http://chatgpt-front-production.up.railway.app/${id}`)
      .then((response) => {
        setPost(response.data);
      }, []);
  });

  return (
    <div className="postPage1">
      <div className="leftside1">
        <div className="title1">{post.title}</div>
        <div className="data1">{post.postText}</div>
        <div className="appjs1">{post.appjs}</div>
        <div className="indexjs1">{post.indexjs}</div>
      </div>
      <div className="rightside1">Comment Section</div>
    </div>
  );
}

export default Post;
