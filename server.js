const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware to connect the js and css files
app.use(express.static(path.join(__dirname, 'public')));

//middleware to connect to the routes
app.use(require('./controllers/'));

//change force to false when going live to retain data
//force true will drop and then create the tables
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});