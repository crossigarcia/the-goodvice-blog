const router = require("express").Router();
const { Post, Tag, User } = require("../../models");
const { Op } = require("sequelize");

// const { Tag } = require("../../models");

router.get('/', (req, res) => {
  Post.findAll({})
  .then(dbTags => res.json(dbTags))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/tags/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "tag_text"]
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

router.put("/:id", (req, res) => {
  Post.update(
    {
      tag_text: req.body.tag_text
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
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            tag_id: req.params.id
        }
        , attributes: ['post_id']
    })
    .then(dbTags => {
        const postIds = dbTags.map(postTag => postTag.get({plain:true}).post_id);
        return Post.findAll({
            where: {
                id: postIds
            },
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at',
                'tag_id'
            ]
        })
    })
    .catch(err => {
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

module.exports = router;