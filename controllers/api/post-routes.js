const router = require('express').Router();
const { Post, Tag, User, Comment, PostTag } = require('../../models');
const withAuth = require('../../utils/auth');


// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_text', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_text', 'title', 'created_at'],
      
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// create new post
router.post('/', withAuth, (req, res) => {
  console.log(req.body)
    Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      tag_id: req.body.tag_id,
      image_url: req.body.image_url,
      user_id: req.session.user_id
    })
    .then((post) => {
      if (req.body.tagIds.length) {
        const postTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            post_id: post.id,
            tag_id,
          };
        });
        return PostTag.bulkCreate(postTagIdArr);
      }
      res.status(200).json(post);
    })
    .then((postTagIds) => res.status(200).json(postTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;