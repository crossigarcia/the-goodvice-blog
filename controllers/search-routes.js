const router = require("express").Router();
const sequelize = require('../config/connection');
const { Post, User, Comment,Tag, PostTag } = require('../models');
const { Op } = require("sequelize");


// router.get("/search?:query", (req, res) => {
  router.get("/query=:query", (req, res) => {
    let query = req.params.query;
    Post.findAll({
      where: {
        [Op.or]: [
            { title: {
                    [Op.like]: `%${query}%`
                }
            },
            { post_text: {
                    [Op.like]: `%${query}%`
                }
            }
        ] 
      }
      , attributes: ["title", "post_text"]
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
