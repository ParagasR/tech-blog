const { User } = require('../models');

const userData = [
    {
        user: 'NinjaStep',
        email: 'ninjastep@email.com',
        password: '12345678',
    },
    {
        user: 'Chochinibi',
        email: 'chochinibi@email.com',
        password: '12345678',
    },
    {
        user: 'DeterminedSloth',
        email: 'determinedsloth@email.com',
        password: '12345678',
    },
    {
        user: 'Zima',
        email: 'zima@email.com',
        password: '12345678',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;