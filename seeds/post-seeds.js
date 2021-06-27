const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
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