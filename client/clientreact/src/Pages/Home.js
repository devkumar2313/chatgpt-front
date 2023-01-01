import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listofPosts, setListofPosts] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:1001/posts").then((response) => {
      setListofPosts(response.data);
    });
  }, []);
  return (
    <div className="App">
      {listofPosts.map((value, key) => {
        return (
          <div
            className="post"
            onClick={() => {
              history(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
