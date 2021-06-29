const sequelize = require('../config/connection');
const { Tag } = require('../models');

const tagdata = [
  {
    tag_text: "plants"
  },
  {
    tag_text: "pets"
  },
  {
    tag_text: "food"
  },
  {
    tag_text: "household"
  },
  {
    tag_text: "general"
  }
  
];

const seedTags = () => Tag.bulkCreate(tagdata);

module.exports = seedTags;