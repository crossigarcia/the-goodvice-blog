const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Tag, PostTag } = require("../models");
const { Op } = require("sequelize");

// search by tag
router.get("/tagged/:query", (req, res) => {
  let term = req.params.query;
  switch (term) {
    case "plants":
      tag_id = 1;
      break;
    case "pets":
      tag_id = 2;
      break;
    case "food":
      tag_id = 3;
      break;
    case "household":
      tag_id = 4;
      break;
    case "general":
      tag_id = 5;
      break;
  }
  console.log(tag_id);

  PostTag.findAll({
    where: {
      tag_id: tag_id,
    },
    attributes: ["post_id"],
  })
    .then((dbTags) => {
      let postIds = dbTags.map(
        (postTag) => postTag.get({ plain: true }).post_id
      );
      return Post.findAll({
        where: {
          id: { [Op.in]: postIds },
        },
        attributes: ["id", "title", "post_text", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
            ],
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
      });
    })
    .then((dbTags) => {
      const posts = dbTags.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
        nextUrl: "/tags/" + req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// search by query
router.get("/q=:query", (req, res) => {
  let query = req.params.query;
  Post.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          post_text: {
            [Op.like]: `%${query}%`,
          },
        },
      ],
    },
    attributes: ["id", "title", "post_text", "created_at"],
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
    .then((dbTags) => {
      const posts = dbTags.map((post) => post.get({ plain: true }));
      if (posts.length > 0) {
        res.render("homepage", {
          posts,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.render ('empty-results', {
          loggedIn: req.session.loggedIn,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
