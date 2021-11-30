const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.loggedUser,
            post_id: req.session.currentPost,
        });

        req.session.save(() => {
            res.status(200).json(newComment);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;