const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const Allposts = await Posts.findAll();
  res.json(Allposts);
});

router.get("/:id", async (req, res) => {
  const Post = await Posts.findByPk(req.params.id);
  res.json(Post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
