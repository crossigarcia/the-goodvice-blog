const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "this is a title",
    post_text: "this is a post",
    user_id: 1
  },
  
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;