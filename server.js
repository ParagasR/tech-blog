//npm required stuff
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers')

//files to require
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

//set up sessions w/ cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    //spec for cookie:
    maxAge: 86400, //set it to exepire after 24 hours
  },
  //prevent the session to saved back to the session store
  //session store: where it will be saved to, either memory or some database
  //we dont want to save the session
  resave: false,
  //forces new unmodified sessions to be saved the session store, anything modified will not store
  //might change false later so that it wont be stored either way? idk yet
  saveUninitialized: true,
  //set what kind of database is being used (MySQL)
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware to connect the js and css files
app.use(express.static(path.join(__dirname, 'public')));

//middleware to connect to the routes
app.use(routes);

//change force to false when going live to retain data
//force true will drop and then create the tables
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});