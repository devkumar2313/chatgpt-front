import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [listofPosts, setListofPosts] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    axios
      .get("chatgpt-front-production.up.railway.app/posts")
      .then((response) => {
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
            <div className="data">
              <button className="copy-btn">copy</button>
              {value.postText}
            </div>
            <div className="appjs">
              <button className="copy-btn">copy</button>
              {value.appjs}
            </div>
            <div className="indexjs">
              <button className="copy-btn">copy</button>
              {value.indexjs}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
