const { User } = require('../models');

const userData = [
    {
        user: 'NinjaStep',
        password: '12345678',
    },
    {
        user: 'Chochinibi',
        password: '12345678',
    },
    {
        user: 'DeterminedSloth',
        password: '12345678',
    },
    {
        user: 'Zima',
        password: '12345678',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;