const sequelize = require('../config/connection');
const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: "this is a comment",
    user_id: 1,
    post_id: 1
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;