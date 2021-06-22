const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);

module.exports = router;
