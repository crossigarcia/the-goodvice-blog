const sequelize = require('../config/connection');
const { Tag } = require('../models');

const tagdata = [
  {
    tag_text: "this is a tag"
  },

  {
    tag_text: "this is a new tag"
  },

  { 
    tag_text: "this is a 3rd tag"
  },
  
];

const seedTags = () => Tag.bulkCreate(tagdata);

module.exports = seedTags;