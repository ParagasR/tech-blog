const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');

const seedAll = async () => {
    await sequelize.sync({ force: true }).catch((err) => { console.log(err) });

    await seedUser().catch((err) => { console.log(err) });

    await seedPost();

    process.exit(0);
};

seedAll();