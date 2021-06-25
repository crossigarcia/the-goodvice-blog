const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');
const seedTags = require('./tag-seeds');
const seedPostTags = require('./post-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();

  //await seedComments();

  await seedPosts();

  await seedTags();

  //await seedPostTags();

  process.exit(0);
};

seedAll();
