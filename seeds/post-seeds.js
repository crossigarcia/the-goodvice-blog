const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    title: "First Post",
    post_text: "post text for first post",
    user_id: 1,
  },
  {
    title: "Second Post",
    post_text: "post text for second post",
    user_id: 1,
    image_url:
      "https://cdn11.bigcommerce.com/s-lhibl/stencil/0f397120-088c-0137-97c6-00b93c38be4d/icons/icon-no-image.svg",
  },
  {
    title: "Third Post",
    post_text: "post text for third post",
    user_id: 2,
    image_url:
      "https://cdn11.bigcommerce.com/s-lhibl/stencil/0f397120-088c-0137-97c6-00b93c38be4d/icons/icon-no-image.svg",
  },
  {
    title: "Fourth Post",
    post_text: "post text for fourth post",
    user_id: 3,
    image_url:
      "https://cdn11.bigcommerce.com/s-lhibl/stencil/0f397120-088c-0137-97c6-00b93c38be4d/icons/icon-no-image.svg",
  },
  {
    title: "Fifth Post",
    post_text: "post text for fifth post",
    user_id: 4,
    image_url:
      "https://cdn11.bigcommerce.com/s-lhibl/stencil/0f397120-088c-0137-97c6-00b93c38be4d/icons/icon-no-image.svg",
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;