const router = require("express").Router();
const { Post, Tag, User } = require("../../models");
const withAuth = require("../../utils/auth");

//router.set('view engine', 'ejs');


router.get('/upload', (req, res, next)=> {
    res.render('img_fm.ejs');
});

router.post('/upload', (req, res, next)=> {
    res.redirect('/');
})

//==========================================================================


module.exports = router;
