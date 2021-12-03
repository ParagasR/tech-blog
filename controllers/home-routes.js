const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

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
    const post = postDetails.get({ plain: true })
    req.session.currentPost = req.params.id;
    res.render('singlePost', { post, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const postDetails = await Post.findByPk(req.params.id);
    const post = postDetails.get({ plain: true })
    res.status(200).json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.loggedUser, {
      include: {
        model: Post,
      },
      attributes: { excludes: ['password'] }
    });
    user = dbUserData.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err)
    const userWithoutComments = await User.findByPk(req.session.loggedUser, {
      attributes: { exclude: ['password'] }
    });
    if (!userWithoutComments) {
      res.status(404).json('user doesnt exist')
    }
    user = userWithoutComments.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  }
})

module.exports = router;