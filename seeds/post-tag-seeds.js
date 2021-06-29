const {PostTag} = require('../models');

const postTagData = [
    {
        post_id: 1,
        tag_id: 5
<<<<<<< HEAD
    }
=======
    },
    {

        post_id: 2,
        tag_id: 5,
    },
    {
        post_id: 3,
        tag_id: 3,
    },
    {
        post_id: 4,
        tag_id: 2,
    },
    {
        post_id: 3,
        tag_id: 1,
    },
>>>>>>> ee76d60a9bb45532ff400e2ca6c8e34bb58c97b4
];

const seedPostTags = () => PostTag.bulkCreate(postTagData);

module.exports = seedPostTags;