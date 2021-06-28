const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
    user_id: 1,
    tag_id: 2
  }
  , {
    title: "vacation 2020",
    post_text: "please send help my brain is melting",
    user_id: 1,
    tag_id: 2
  }
  , {
    title: "vacation 2049",
    post_text: "all good here thanks tho",
    user_id: 1,
    tag_id: 4
  }
  , {
    title: "How to Lie 101",
    post_text: "Tell everyone you like lying. It sets a precedent.",
    user_id: 4,
    tag_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;