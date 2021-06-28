const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
    user_id: 1
  }
  ,
  {
    title: "Second Post",
    post_text: "post text for second post",
    user_id: 1
  }
  ,
  {
    title: "Third Post",
    post_text: "post text for third post",
    user_id: 2
  }
  ,
  {
    title: "Fourth Post",
    post_text: "post text for fourth post",
    user_id: 3
  }
  ,
  {
    title: "Fifth Post",
    post_text: "post text for fifth post",
    user_id: 4
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;