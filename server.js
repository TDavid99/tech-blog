const path = require("path");
const express = require("express");
const helpers = require("./utils/helpers");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");
const { Sequelize } = require("sequelize");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secrect: "",
    Cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({
    helpers: {
        format_data: data => {
            return `${date.getMonth()+ 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    }
});

app.engine("handlebas", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/'));

app.listen(PORT, () =>{
    console.log(`app listening on port ${PORT}!`);
    Sequelize.afterSync({force: false});
});
