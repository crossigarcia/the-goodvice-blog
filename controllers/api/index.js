const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
