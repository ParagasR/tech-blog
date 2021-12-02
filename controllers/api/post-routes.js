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
      res.status(204).json(newComment);
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post: req.body.comment,
      user_id: req.session.loggedUser,
    });
    req.session.save(() => {
      res.status(204).json(newPost)
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.loggedUser,
      }
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id for this user' })
      return
    }

    res.status(200).json(deletePost)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;