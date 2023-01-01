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
  organization: "org-FXl4rbDAnncM1Zy8R4i1X8g6",
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
  await fs.writeFileSync(
    "c:/Users/devku/Desktop/Some projects/React tutorial/outputcode/posts.js",
    data.postText
  );
  await fs.writeFileSync(
    "c:/Users/devku/Desktop/Some projects/React tutorial/outputcode/app.js",
    data.appjs
  );
  await fs.writeFileSync(
    "c:/Users/devku/Desktop/Some projects/React tutorial/outputcode/backend.js",
    data.indexjs
  );

  await Posts.create(post);
  res.json(post);
});

module.exports = router;
