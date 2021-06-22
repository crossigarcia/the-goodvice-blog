const router = require('express').Router();
const { User } = require('../../models');

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
    where: {
      id: req.params.id
    }
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

//login user

//logout user

//update user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    // hooks?
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
