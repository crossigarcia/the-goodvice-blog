const router = require("express").Router();
const { Op } = require("sequelize");
const { Post, Tag, User } = require("../../models");
const { Tag } = require("../../models");

router.get('/', (req, res) => {
  Tag.findAll({})
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

// router.put("/:id", (req, res) => {
//   Post.update(
//     {
//       tag_text: req.body.tag_text
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbTagData) => {
//       if (!dbTagData) {
//         res.status(404).json({ message: "No tag found with this id" });
//         return;
//       }
//       res.json(dbTagData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete("/:id", (req, res) => {
//   Post.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbTagData) => {
//       if (!dbTagData) {
//         res.status(404).json({ message: "No tag found with this id" });
//         return;
//       }
//       res.json(dbTagData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/search?:query", (req, res) => {
    const query = req.params.query;
    // let query = req.params.query;
    console.log(query);

    Post.findAll({
      where: {
        [Op.or]: [
            { 'title': {
                // [Op.like]: `%${query}%`
                [Op.like]: '%' + query
            }},
            { 'post_text': {
                [Op.like]: `%${query}%`
            }}
        ] 
      }
    //   , attributes: ["title", "post_text"]
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