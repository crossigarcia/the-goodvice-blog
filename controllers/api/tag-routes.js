const router = require("express").Router();
const { Tag } = require("../../models");

router.get('/', (req, res) => {
  Tag.findAll({})
  .then(dbTags => res.json(dbTags))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/:id", (req, res) => {
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

router.post("/", withAuth, (req, res) => {
  // check the session
  console.log("==inside tag create==")
  if (req.session) {
    Tag.create({
      tag_text: req.body.tag_text,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});



module.exports = router;
