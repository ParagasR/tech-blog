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

        const posts = dbPostData.map((post) => {
            console.log(post.get({ plain: true }))
        });

        res.render('post', { posts })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;