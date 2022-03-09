const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize

if (process.env.DATABASE_URL) {
    sequelize = {
        HOST: "us-cdbr-iron-east-02.cleardb.net",
        USER: "b8fa94b4b3f8de",
        PASSWORD: "bb9025eb",
        DB: "heroku_70f6eb6a8e9a396"
    }
} else { 
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }
    );
}

module.exports = sequelize;