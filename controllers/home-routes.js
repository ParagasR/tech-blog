const router = require('express').Router();
const { User, Post, Comment } = require('../models');

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
        if (req.session.loggedIn) {
            res.render('post', { posts, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
        } else {
            res.render('post', { posts })

        }
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

router.get('/post/:id', async (req, res) => {
    try {
        const postDetails = await Post.findByPk(req.params.id, {
            include: [{
                model: Comment,
                attributes: ['comment', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['user']
                }
            },
            {
                model: User,
                attributes: ['user']
            }]
        });
        console.log('went past the error and didnt skip to catch')
        const post = postDetails.get({ plain: true })
        res.render('singlePost', post)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.params.id, {
            include: {
                model: Post,
                attributes: ['title', 'post', 'createAt']
            },
        });
        res.json(dbUserData.get({ plain: true }))
    } catch (err) {
        const userWithoutComments = await User.findByPk(req.params.id);
        if (!userWithoutComments) {
            res.status(404).json('user doesnt exist')
        }
        res.json(userWithoutComments.get({ plain: true }))
    }
})

module.exports = router;