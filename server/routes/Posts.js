const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const fs = require("fs");

let subject = { postText: "", appjs: "", indexjs: "" };
let data = { postText: "", appjs: "", indexjs: "" };

const OpenAi = require("openai");
const { JSON } = require("sequelize");
const { json } = require("express");
const { Configuration, OpenAIApi } = OpenAi;

const configuration = new Configuration({
  organization: "org-NSaecRFEKQ0qi1fmdBlL3MmT",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
router.get("/", async (req, res) => {
  const Allposts = await Posts.findAll();
  res.send(Allposts);
});

router.get("/:id", async (req, res) => {
  const Post = await Posts.findByPk(req.params.id);
  res.json(Post);
});

router.post("/", async (req, res) => {
  subject.postText = req.body.postText;
  subject.appjs = req.body.appjs;
  subject.indexjs = req.body.indexjs;

  const responses = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: subject.postText,

    max_tokens: 1000,
    temperature: 0,
  });
  const responses2 = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: subject.appjs,

    max_tokens: 1000,
    temperature: 0,
  });
  const responses3 = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: subject.indexjs,

    max_tokens: 1000,
    temperature: 0,
  });
  data.postText = responses.data.choices[0].text;
  data.appjs = responses2.data.choices[0].text;
  data.indexjs = responses3.data.choices[0].text;
  const post = {
    title: req.body.title,
    postText: data.postText,
    appjs: data.appjs,
    indexjs: data.indexjs,
  };

  await Posts.create(post);
  res.json(post);
});

module.exports = router;
