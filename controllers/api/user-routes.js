const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get user by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['title', 'post_text', 'created_at']
      },
      {
        model: Comment,
        attributes: ['comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//create user
router.post('/', ({ body }, res) => {
  User.create(body)
  .then(user => {
    //req.session.save()
    res.json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// //login user
// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(dbUserData => {
//     if(!dbUserData) {
//       res.status(400).json({ message: 'Username does not exist, try again!'});
//       return;
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);
//     if (!validPassword) {
//       res.status(400).json({ message: 'Invalid password' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;

//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });
// });

// //logout user
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

//update user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(user => res.json(user))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(user => res.json(user))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;
