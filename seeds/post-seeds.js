const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "this is a title",
    post_text: "this is a post",
    user_id: 1
  }
  , {
    title: "vacation 2021",
    post_text: "please send help my brain is melting",
    user_id: 1,
    tag_id: 2
  }
  , {
    title: "vacation 2022",
    post_text: "all good here thanks tho",
    user_id: 1,
    tag_id: 4
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;