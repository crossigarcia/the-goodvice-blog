const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Tag, PostTag } = require("../models");


router.get("/:tag_id", (req, res) => {
  Post.findAll({
    where: {
      tag_id: req.params.tag_id
    },
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Tag,
        as: "tags",
      },
    ],
  })
  .then(dbPostData => {
      console.log(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
