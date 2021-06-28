const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment, Tag } = require('../models');


router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        Tag.findAll({
          attributes: [
            'id',
            'tag_text'
          ]
        })
        .then(dbTags => {
          const tags = dbTags.map(tag => tag.get({ plain: true }));
          res.render('dashboard', { tags, posts, loggedIn: true  } )
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
              model: Tag,
              as: 'tags'
            }
        ]
    })
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                Tag.findAll({
                  attributes: [
                    'id',
                    'tag_text'
                  ]
                  })
                  .then(dbTags => {
                   const tags = dbTags.map(tag => tag.get({ plain: true }));

                res.render('edit-post', {
                    post,
                    tags,
                    loggedIn: true
                });
              })

              } else {
                res.status(404).end();
            }
           })
         .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;