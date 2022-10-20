const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const hbs = exphbs.create({});
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Restricted Area',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })

};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/homeRoutes'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is live on http://localhost:${PORT}`));
});