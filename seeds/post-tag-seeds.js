const {PostTag} = require('../models');

const postTagData = [
    {
        post_id: 1,
        tag_id: 1,
    },

    {

        post_id: 4,
        tag_id: 2,
    },

    {
        post_id: 5,
        tag_id: 4,
    },
];

const seedPostTags = () => PostTag.bulkCreate(postTagData);

module.exports = seedPostTags;