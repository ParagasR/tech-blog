const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    //change to get data from database blog items then pass through blog template handlebar
    try {
        const dbPostData = await Post.findAll({
            include: {
                model: User,
                attributes: ['user']
            }
        });

        //still the problem child
        //{} after the => was the issue
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)

        res.render('post', { posts })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;