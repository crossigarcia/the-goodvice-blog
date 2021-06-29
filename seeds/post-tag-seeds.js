const {PostTag} = require('../models');

const postTagData = [
    {
        post_id: 1,
        tag_id: 5
    }
];

const seedPostTags = () => PostTag.bulkCreate(postTagData);

module.exports = seedPostTags;