import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    appjs: "",
    indexjs: "",
    // username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    // postText: Yup.string().required("Post is required"),
    // username: Yup.string().min(3).max(15).required("Username is required"),
  });

  let history = useNavigate();

  const onSubmit = (values) => {
    axios
      .post("https://chatgpt-back.onrender.com/posts", values)
      .then((response) => {
        history("/");
      });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label className="label">Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex-Dev...)"
          />
          <label className="label">Data:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(your question...)"
          />
          <label className="label">appjs:</label>
          <ErrorMessage name="appjs" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="appjs"
            placeholder="(Ex-Post...)"
          />
          <label className="label">indexjs:</label>
          <ErrorMessage name="indexjs" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="indexjs"
            placeholder="(Ex-Dev123...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
