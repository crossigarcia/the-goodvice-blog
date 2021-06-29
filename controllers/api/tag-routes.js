const router = require("express").Router();
const { Post, Tag, User, PostTag, Comment } = require("../../models");
const { Op } = require("sequelize");

// const { Tag } = require("../../models");

router.get("/", (req, res) => {
  Post.findAll({})
    .then((dbTags) => res.json(dbTags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Post.update(
    {
      tag_text: req.body.tag_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// search by tag
router.get("/:id", (req, res) => {
  PostTag.findAll({
    where: {
      tag_id: req.params.id,
    },
    attributes: ["post_id"],
  })
    .then((dbTags) => {
      console.log("____________" + dbTags);
      let postIds = dbTags.map(
        (postTag) => postTag.get({ plain: true }).post_id
      );
      console.log("trying to find this dude" + postIds);
      return Post.findAll({
        where: {
          id: { [Op.in]: postIds },
        },
        attributes: [
          "id",
          "title",
          "post_text",
          //   'created_at',
          //   'updated_at',
          //   'tag_id'
        ],
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
    attributes: ["title", "post_text"],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post("/", (req, res) => {
//   // check the session
//   console.log("==inside tag create==")
//   if (req.session) {
//     Tag.create({
//       tag_text: req.body.tag_text,
//     })
//       .then((dbCommentData) => res.json(dbCommentData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

module.exports = router;
