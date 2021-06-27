const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
    user_id: 1
  },
  
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;