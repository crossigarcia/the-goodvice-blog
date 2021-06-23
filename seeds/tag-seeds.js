const sequelize = require('../config/connection');
const { Tag } = require('../models');

const tagdata = [
  {
    tag_text: "this is a tag"
  }
  
];

const seedTags = () => Tag.bulkCreate(tagdata);

module.exports = seedTags;