const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Tag, PostTag } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('Breath... Encourage your teammates... Breath... Repeat...');
  console.log(req.session);
  
  res.render('homepage', {});
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;
