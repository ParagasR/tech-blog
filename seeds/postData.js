const { Post } = require('../models');

const postData = [
    {
        post: 'This is post 1',
        user_id: 1,
    },
    {
        post: 'This is post 2',
        user_id: 2,
    },
    {
        post: 'This is post 3',
        user_id: 3,
    },
    {
        post: 'This is post 4',
        user_id: 4,
    },
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;