const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'crossi',
    email: 'crossi@email.com',
    password: 'crossiPass'
  },
  {
    username: 'cpadmanabhan',
    email: 'cpad@email.com',
    password: 'cpadPass'
  },
  {
    username: 'cgalicia',
    email: 'rgalicia@email.com',
    password: 'rgaliciaPass'
  },
  {
    username: 'npetelo',
    email: 'npetelo@email.com',
    password: 'npeteloPass'
  },
  
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
