// const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Post, User, Comment, Tag, PostTag } = require("../models");


// router.get("/", (req, res) => {
//   Tag.findAll({
//     attributes: ["id", "tag_text"],
//   })
//   .then(dbTagData => {
//       const tags = dbTagData.map(tag => tag.get({ plain: true }));

//       res.render('search', { tags })
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// module.exports = router;