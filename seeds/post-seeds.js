const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
    user_id: 1,
    image_url: ""
  },
  {
    title: "Second Post",
    post_text: "post text for second post",
    user_id: 1,
    image_url:
      "",
  },
  {
    title: "Third Post",
    post_text: "post text for third post",
    user_id: 2,
    image_url:
      "",
  },
  {
    title: "Fourth Post",
    post_text: "post text for fourth post",
    user_id: 3,
    image_url:
      "",
  },
  {
    title: "Fifth Post",
    post_text: "post text for fifth post",
    user_id: 4,
    image_url:
      "",
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;